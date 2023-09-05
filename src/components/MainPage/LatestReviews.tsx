import { getLatestReviews } from '@/api/review';
import Link from 'next/link';

export const revalidate = 0;

const LatestReviews = async () => {
  const latestReviewData = await getLatestReviews();
  const backgroundColors = ['MainYellow2', 'MainBlue2', 'MainPurple2', 'MainOrange2'];
  return (
    <div className="p-5 flex-1">
      <h1 className="h1_suit">최신 리뷰</h1>
      <div>
        {latestReviewData?.map((review, index) => {
          return (
            <Link key={review.reviewid} href={`/review/${review.reviewid}`} className="w-full mb-16">
              <div className={`p-4 border border-gray-300 rounded h-36 bg-${backgroundColors[index]}`}>
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
