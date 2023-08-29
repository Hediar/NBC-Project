'use client';
import { getLatestReviews, getUserName } from '@/api/review';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const LatestReviews = () => {
  const { data: latestReviewData } = useQuery(['latest_reviews'], getLatestReviews);

  return (
    <div className="p-5">
      <h2 className="text-2xl">최신 리뷰</h2>
      <div className="flex flex-wrap gap-4">
        {latestReviewData?.data!.map((review) => {
          let username;
          username = getUserName(review.userid);
          return (
            <Link key={review.reviewid} href={`/review/${review.reviewid}`} className="w-full">
              <div className=" p-4 border border-gray-300 rounded">
                <div className="font-bold mb-2">{username}</div>
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
