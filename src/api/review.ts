import supabase from '@/supabase/config';
import { getDetailData } from './tmdb';
import { useSearchParams } from 'next/navigation';

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
    const userAvatarURL = userData?.map((data) => data.avatar_url);

    const filterData = { ...data, username: usernameData!, userAvatarURL, reviewLikesCount: reviewLikes };

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

export const countRowsNumber = async (table: string = 'reviews') => {
  const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
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

  const { count } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
  const total_pages = Math.ceil(count! / limit);

  let query = supabase.from('reviews').select(`*, reviewlikes(count)`);
  if (q) {
    switch (filter) {
      case 'movie_title':
        console.log(filter, ' => movie_title');
        query = query.eq('movie_title', q);
        break;
      case 'review_cont':
        console.log(filter, ' => review_cont');
        query = query.eq('content, review', q);
        break;
      default:
        console.log(filter, ' => default');
        query = query.eq('movie_title, content, review', q);
    }
  }
  switch (sort) {
    case 'likes':
      console.log(sort, ' => likes');
      query = query.order(`reviewlikes(count)`, { ascending: false, nullsFirst: false });
      break;
    case 'rating':
      console.log(sort, ' => rating');
      query = query.order('rating', { ascending: false });
      break;
    default:
      console.log(sort, ' => new');
      query = query.order('created_at', { ascending: false });
  }
  query.range((pageParam - 1) * limit, pageParam * limit - 1);

  const { data: reviews, error } = await query;
  // console.log('reviews => ', reviews);

  const promises = reviews?.map(async (review) => {
    const movieDetail = await getDetailData(review.movieid);
    const userProfile = await getUserProfile(review.userid);
    return { ...review, movieDetail, userDetail: { ...userProfile } };
  });
  const results = await Promise.all(promises!);

  return { results, page: pageToFetch, total_pages };
}

// 리뷰 작성 시 최근 본 영화 추가
export const saveWatchList = async (userId: string, movieId: string) => {
  const { data: watchTable } = await supabase.from('watch_later').select('*').eq('userid', userId);

  if (watchTable) {
    const newWatch = watchTable[0].movies.filter((watchId: string) => watchId !== movieId);
    newWatch.push(String(movieId));

    const { error } = await supabase.from('watch_later').update({ movies: newWatch }).eq('userid', userId);
    if (error) console.error(error);
  } else {
    const { error } = await supabase
      .from('watch_later')
      .insert([{ userid: userId, movies: [movieId] }])
      .select();
    if (error) console.error(error);
  }

  // console.log('2. watchTable => ', watchTable);
};
