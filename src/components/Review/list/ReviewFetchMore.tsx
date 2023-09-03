'use client';

import { fetchReviewData } from '@/api/review';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import ReviewItem from './ReviewItem';

type Props = {};

const ReviewFetchMore = (props: Props) => {
  const {
    data: reviews,
    hasNextPage,
    fetchNextPage
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
  console.log('✅reviews => ', reviews);

  const fetchMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  return (
    <>
      <ul>
        {reviews?.map((review: any, i: number) => (
          <ReviewItem key={i} review={review} />
        ))}
      </ul>
      <div onClick={() => fetchMore()}>ReviewFetchMore 버튼 테스트</div>
    </>
  );
};

export default ReviewFetchMore;
