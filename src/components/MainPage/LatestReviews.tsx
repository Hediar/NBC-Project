import { getLatestReviews, getUserName } from '@/api/review';
import Link from 'next/link';

export const revalidate = 0;

const LatestReviews = async () => {
  const latestReviewData = await getLatestReviews();
  return (
    <div className="p-5">
      <h2 className="text-2xl">최신 리뷰</h2>
      <div className="flex flex-wrap gap-4">
        {latestReviewData?.map((review) => {
          return (
            <Link key={review.reviewid} href={`/review/${review.reviewid}`} className="w-full">
              <div className=" p-4 border border-gray-300 rounded">
                <div className="font-bold mb-2">{review.username}</div>
                <div className="overflow-ellipsis">{review.content}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LatestReviews;
