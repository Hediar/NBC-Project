import supabase from '@/supabase/config';
import { getDetailData } from './tmdb';

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
export const getUserName = async (userid: string) => {
  const { data: userName } = await supabase.from('users').select('username').eq('id', userid);

  if (userName && userName.length > 0) {
    return userName[0].username;
  }

  return null; // 사용자가 없을 경우 또는 데이터가 올바르지 않을 경우
};

export const countRowsNumber = async (table: string = 'reviews') => {
  const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
  return count;
};

// 리뷰 리스트페이지 더보기
export async function fetchReviewData({ queryKey, pageParam = 1, limit = 15, sort }: any) {
  // 정렬 만드는 중
  // const test3 = await supabase
  //   .from('reviews')
  //   .select(
  //     `*,
  // reviewlikes (
  //   count
  // )`
  //   )
  //   .order('count', { foreignTable: 'reviewlikes', ascending: false });
  // // .range(0, 10);
  // console.log('test3 => ', test3);

  // const getReviewsBySortQuery = () => {
  //   switch (sort) {
  //     case 'new':
  //       return supabase.from('reviews').select('*').order('created_at', { ascending: false }).range(rangeFrom, rangeTo);
  //     case 'likes':
  //       return supabase.from('reviews').select('*').order('rating', { ascending: false }).range(rangeFrom, rangeTo);
  //     case 'rating':
  //       return supabase.from('reviews').select('*').order('rating', { ascending: false }).range(rangeFrom, rangeTo);
  //     default:
  //       return supabase.from('reviews').select('*').range(rangeFrom, rangeTo);
  //   }
  // };

  const [_, page] = queryKey;
  // useQuery 에서 사용될 때는 queryKey 에서 page 추출
  // useInfiniteQuery에서 사용될 때는 pageParam 에서 page 추출
  const pageToFetch = page ?? pageParam;

  const { count } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
  const total_pages = Math.ceil(count! / limit);

  const rangeFrom = (pageParam - 1) * limit;
  const rangeTo = pageParam * limit - 1;
  // console.log('range => ', rangeFrom, ' ~ ', rangeTo, ' / count => ', count);
  // console.log('page => ', pageToFetch, ' /  total_pages => ', Math.ceil(count! / limit));

  const reviews = await supabase.from('reviews').select('*').range(rangeFrom, rangeTo);
  const promises = reviews.data?.map(async (review) => {
    const movieDetail = await getDetailData(review.movieid);
    const username = await getUserName(review.userid);
    return { ...review, movieDetail, userDetail: { username } };
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
