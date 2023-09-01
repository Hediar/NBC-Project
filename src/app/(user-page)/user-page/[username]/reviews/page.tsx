'use client';

import { getReviews, countRowsNumber } from '@/api/review';
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
  const [totalRowsNumber, setTotalRowsNumber] = useState<number | null>(null);

  const REVIEWS_LIMIT = 3;

  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const getMoreData = async (page: number) => {
      if (totalRowsNumber === null) {
        const fetchRowNumberData = await countRowsNumber('reviews');
        setTotalRowsNumber(fetchRowNumberData!);
      }

      const { data, error } = await getReviews({ userid: userInfo.id!, page, limit: REVIEWS_LIMIT });
      setReviews([...reviews, ...(data as ReviewsTable[])]);

      // console.log(
      //   'totalRowsNumber <= reviews.length+3+1 => ',
      //   totalRowsNumber,
      //   reviews.length + 3 + 1,
      //   totalRowsNumber! <= reviews.length + 3 + 1
      // );
      totalRowsNumber !== null && totalRowsNumber! <= reviews.length + REVIEWS_LIMIT + 1
        ? setIsTotalPage(true)
        : setIsTotalPage(false);
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
            className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
          >
            더 보기{`(${currentPage}/${Math.ceil(totalRowsNumber! / (REVIEWS_LIMIT + 1))})`}
          </button>
        )}
      </div>
    </div>
  );
};

export default MyReviewPage;
