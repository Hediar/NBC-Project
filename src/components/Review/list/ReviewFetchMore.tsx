'use client';

import { fetchReviewData } from '@/api/review';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import ReviewItem from './ReviewItem';

type Props = {
  sort: string;
};

const ReviewFetchMore = ({ sort }: Props) => {
  const {
    data: reviews,
    hasNextPage,
    fetchNextPage,
    isFetching
  } = useInfiniteQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviewData,
    getNextPageParam: (lastPage) => {
      //   console.log('page: ', lastPage.page, ' / total_pages: ', lastPage.total_pages);
      if (lastPage.page < lastPage.total_pages!) {
        return lastPage.page + 1;
      }
    },
    select: (data: any) => {
      return data.pages.map((pageData: any) => pageData.results).flat();
    }
  }) as any;
  // console.log('✅reviews => ', reviews);

  const fetchMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 p-2">
        {reviews?.map((review: any, i: number) => (
          <ReviewItem key={i} review={review} />
        ))}
      </ul>
      {hasNextPage && (
        <button
          type="button"
          disabled={isFetching}
          onClick={fetchMore}
          className="w-full bg-blue-700 cursor-pointer text-center py-2 text-white"
        >
          {isFetching ? '로딩 중...' : '더 보기'}
        </button>
      )}
    </div>
  );
};

export default ReviewFetchMore;
