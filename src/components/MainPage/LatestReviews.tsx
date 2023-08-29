import { getLatestReviews } from '@/api/review';

export const revalidate = 0;

const LatestReviews = async () => {
  const data = await getLatestReviews();
  console.log(data);
  return <div>LatestReviews</div>;
};

export default LatestReviews;
