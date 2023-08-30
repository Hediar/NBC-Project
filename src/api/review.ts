import supabase from '@/supabase/config';

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
  limit = 4
}: {
  userid: string;
  page?: number;
  limit?: number;
}) => {
  const rangeFrom = page == 1 ? 0 : limit * (page - 1) + 1;
  const rangeTo = limit * page;

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
