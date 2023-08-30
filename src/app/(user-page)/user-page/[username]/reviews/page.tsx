'use client';

import { getReviews } from '@/api/review';
import ReviewItem from '@/components/ReviewList/ReviewItem';
import ReviewListEmpty from '@/components/ReviewList/ReviewListEmpty';
import useUserInfoStore from '@/store/saveCurrentUserData';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MyReviewPage = () => {
  const { userInfo } = useUserInfoStore();

  const [reviews, setReviews] = useState<ReviewsTable[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTotalPage, setIsTotalPage] = useState(false);

  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const getMoreData = async (page: number) => {
      const { data, error } = await getReviews({ userid: userInfo.id!, page });
      setReviews([...reviews, ...(data as ReviewsTable[])]);

      if (!data?.length) setIsTotalPage(true);
    };
    if (userInfo.id) getMoreData(currentPage);
  }, [userInfo, currentPage]);

  if (!reviews.length) return <ReviewListEmpty />;

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-2">
        <li className="border-dashed border-2 border-gray-400 rounded-2xl">
          <Link href={`/review/write`} className="flex w-full h-full justify-center items-center">
            + 리뷰작성
          </Link>
        </li>

        {reviews.map((review, i) => (
          <ReviewItem review={review} key={'ReviewItem' + i} />
        ))}
      </ul>

      <div className="w-full text-center mx-auto">
        {isTotalPage ? null : (
          <button
            onClick={handleClick}
            type="button"
            className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
          >
            더 보기
          </button>
        )}
      </div>
    </div>
  );
};

export default MyReviewPage;
