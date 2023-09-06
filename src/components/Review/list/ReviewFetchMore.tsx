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
  // console.log('왜안바껴searchParams => ', searchParams);
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
  // console.log('✅reviews => ', reviews);

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
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
        {reviews?.map((review: any, i: number) => (
          <ReviewItem key={i} review={review} />
        ))}
      </ul>
      {hasNextPage && (
        <button type="button" disabled={isFetching} onClick={fetchMore} className="full_button mt-20">
          {isFetching ? '로딩 중...' : '더 보기'}
        </button>
      )}
    </div>
  );
};

export default ReviewFetchMore;
