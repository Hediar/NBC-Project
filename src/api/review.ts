import supabase from '@/supabase/config';
import { getDetailData } from './tmdb';
import { getColors } from '@/util/findColors';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const addReview = async (post: ReviewsTable) => {
  const fetchData = await supabase.from('reviews').insert([post]).select();
  return fetchData;
};

export const updateReview = async (id: string, post: ReviewsTable) => {
  const fetchData = await supabase.from('reviews').update(post).eq('reviewid', id).select();
  return fetchData;
};

export const getReviews = async ({
  userid,
  page = 1,
  limit = 3
}: {
  userid: string;
  page?: number;
  limit?: number;
}) => {
  const initFrom = 0;
  const initTo = limit - 1;
  const rangeFrom = page == 1 ? initFrom : (limit + 1) * (page - 1) - 1;
  const rangeTo = (limit + 1) * page - initTo;

  const fetchData = await supabase
    .from('reviews')
    .select('*')
    .eq('userid', userid)
    .order('created_at', { ascending: false })
    .range(rangeFrom, rangeTo);
  return fetchData;
};

export const getLatestReviews = async () => {
  const { data: getReviews } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false }) // 날짜 기준으로 내림차순 정렬
    .limit(4); // 가져올 개수 제한

  const addUserName = getReviews?.map(async (data) => {
    const { data: userData } = await supabase.from('users').select('*').eq('id', data.userid);
    const { data: reviewLikes } = await supabase.from('reviewlikes').select('count').eq('reviewid', data.reviewid);

    const usernameData = userData?.map((data) => data.username);
    const userAvatarURL = userData?.map((data) => data.avatar_url)[0];
    const color = await getColors(userAvatarURL!);

    const filterData = {
      ...data,
      username: usernameData!,
      userAvatarURL,
      colors: color
    };
    return filterData;
  });
  const allLatestData = await Promise.all(addUserName!);

  return allLatestData;
};

// userid기반으로 닉네임 찾아야함
export const getUserProfile = async (userid: string) => {
  const { data } = await supabase.from('users').select('username, avatar_url').eq('id', userid).single();
  return data; // 사용자가 없을 경우 또는 데이터가 올바르지 않을 경우
};

export const countRowsNumber = async (table: string = 'reviews', userid: string) => {
  const { count } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('userid', userid);
  return count;
};

// 리뷰 리스트페이지 더보기
export async function fetchReviewData(
  { queryKey, pageParam = 1, limit = 15 }: any,
  {
    sort,
    filter,
    q
  }: {
    [key: string]: string | string[] | undefined;
  }
) {
  const [_, page] = queryKey;
  // useQuery 에서 사용될 때는 queryKey 에서 page 추출
  // useInfiniteQuery에서 사용될 때는 pageParam 에서 page 추출
  const pageToFetch = page ?? pageParam;

  let query = supabase.from('reviews').select(`*, reviewlikes(count)`, { count: 'exact', head: false });
  if (q) {
    switch (filter) {
      case 'movie_title':
        query = query.like('movie_title', `%${q}%`);
        break;
      case 'review_cont':
        query = query.like('content, review', `%${q}%`);
        break;
      default:
        query = query.like('movie_title, content, review', `%${q}%`);
    }
  }
  switch (sort) {
    case 'likes':
      query = query.order(`reviewlikes(count)`, { ascending: false, nullsFirst: false });
      break;
    case 'rating':
      query = query.order('rating', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const { count } = await query;
  const total_pages = Math.ceil(count! / limit);

  query.range((pageParam - 1) * limit, pageParam * limit - 1);
  const { data: reviews, error } = await query;

  const promises = reviews?.map(async (review) => {
    const movieDetail = await getDetailData(review.movieid);
    const userProfile = await getUserProfile(review.userid);
    return { ...review, movieDetail, userDetail: { ...userProfile } };
  });
  const results = await Promise.all(promises!);

  return { results, page: pageToFetch, total_pages, count };
}

// 리뷰 작성 시 최근 본 영화 추가
type WatchedMoviesList = Database['public']['Tables']['users']['Row']['watched_movies'];
export const saveWatchList = async (userId: string, movieId: string) => {
  const supa = createClientComponentClient();
  const { data: watchTable, error } = await supa.from('users').select('watched_movies').eq('id', userId).single();

  const watchedMoviesList: WatchedMoviesList = watchTable?.watched_movies;
  if (watchedMoviesList.length !== 0) {
    if (watchedMoviesList.some((db_movieId) => movieId === db_movieId)) {
      return;
    } else {
      const clonedData = structuredClone(watchedMoviesList);
      clonedData.push(movieId.toString());

      const { data, error } = await supa.from('users').update({ watched_movies: clonedData }).eq('id', userId).select();
    }
  } else {
    const a = String(movieId);
    const arr = [];
    arr.push(a);

    const { data, error } = await supa.from('users').update({ watched_movies: arr }).eq('id', userId).select().single();

    if (error) console.error(error);
  }
};
