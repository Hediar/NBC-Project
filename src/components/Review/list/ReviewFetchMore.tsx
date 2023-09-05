'use client';

import { fetchReviewData } from '@/api/review';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const ReviewFetchMore = ({ searchParams }: Props) => {
  console.log('왜안바껴searchParams => ', searchParams);
  const [firstMount, setFirstMount] = useState(true);

  const {
    data: reviews,
    hasNextPage,
    fetchNextPage,
    isFetching,
    refetch,
    remove
  } = useInfiniteQuery({
    queryKey: ['reviews'],
    queryFn: (queryKey) => fetchReviewData(queryKey, searchParams),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages!) {
        return lastPage.page + 1;
      }
    },
    select: (data: any) => {
      return data.pages.map((pageData: any) => pageData.results).flat();
    }
  }) as any;

  useEffect(() => {
    if (!firstMount) {
      remove();
      refetch().then();
    } else {
      setFirstMount(false);
    }
  }, [searchParams]);

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
