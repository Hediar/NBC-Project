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

  // console.log(rangeFrom, '~', rangeTo);

  const fetchData = await supabase
    .from('reviews')
    .select('*')
    .eq('userid', userid)
    .order('created_at', { ascending: false })
    .range(rangeFrom, rangeTo);
  return fetchData;
};

export const getLatestReviews = async () => {
  const fetchData = await supabase
    .from('reviews')
    .select('*')
    .order('date', { ascending: false }) // 날짜 기준으로 내림차순 정렬
    .limit(4); // 가져올 개수 제한

  return fetchData;
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
export async function fetchReviewData({ queryKey, pageParam = 1, limit = 7 }: any) {
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
