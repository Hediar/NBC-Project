'use client';

import { getReviews, countRowsNumber } from '@/api/review';
import MyReviewListLoading from '@/components/ReviewList/MyReviewListLoading';
import ReviewItem from '@/components/ReviewList/ReviewItem';
import ReviewListEmpty from '@/components/ReviewList/ReviewListEmpty';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { Plus } from '@/styles/icons/Icons24';
import { debounce } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MyReviewPage = ({ isUserMatch }: { isUserMatch: boolean }) => {
  const { userInfo } = useUserInfoStore();

  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewsTable[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>();
  const [totalRowsNumber, setTotalRowsNumber] = useState<number | null>(null);

  const REVIEWS_LIMIT = 3;

  const handleClick = () => {
    hasNextPage && setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchMore = async (page: number) => {
      if (totalRowsNumber === null) {
        const fetchRowNumberData = await countRowsNumber('reviews', userInfo.id!);
        setTotalRowsNumber(fetchRowNumberData!);
        return;
      }

      const { data, error } = await getReviews({ userid: userInfo.id!, page, limit: REVIEWS_LIMIT });
      setReviews([...reviews, ...(data as ReviewsTable[])]);
      setIsLoading(false);

      totalRowsNumber! >= reviews.length + REVIEWS_LIMIT + 1 ? setHasNextPage(true) : setHasNextPage(false);
    };

    if (userInfo.id) fetchMore(currentPage);
  }, [userInfo, totalRowsNumber, currentPage]);

  if (isLoading) return <MyReviewListLoading />;
  if (reviews.length == 0) return <ReviewListEmpty isUserMatch={isUserMatch} />;

  return (
    <div className="mb-[300px]">
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2">
        {isUserMatch && (
          <li className="flex items-center justify-center px-10 py-5 border-dashed border-2 border-zinc-300 rounded-2xl bg-neutral-50 ">
            <Link
              href={`/review/write`}
              className="button-dark subtitle1_suit !flex items-center gap-[6px] !py-[10px] !px-5"
            >
              리뷰 작성하기
              <Plus />
            </Link>
          </li>
        )}

        {reviews.map((review, i) => (
          <ReviewItem review={review} key={'ReviewItem' + i} />
        ))}
      </ul>

      <div className="w-full text-center mx-auto">
        {hasNextPage && (
          <button onClick={debounce(handleClick, 300)} type="button" className="full_button w-full items-center mt-20">
            <div className="inline-flex items-center justify-center gap-1 px-5 py-2">
              더 보기{`(${currentPage}/${Math.ceil(totalRowsNumber! / (REVIEWS_LIMIT + 1))})`}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default MyReviewPage;
