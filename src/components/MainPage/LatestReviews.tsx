'use client';
import { getLatestReviews, getUserName } from '@/api/review';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
// export const revalidate = 3600;

const LatestReviews = () => {
  const { data: latestReviewData } = useQuery(['latest_reviews'], getLatestReviews);

  return (
    <div>
      <h2 className="text-2xl">최신 리뷰</h2>
      <div>
        {latestReviewData?.data!.map((review) => {
          let username;
          username = getUserName(review.userid);
          return (
            <div key={review.reviewid}>
              <div>{username}</div>
              <div>{review.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestReviews;
