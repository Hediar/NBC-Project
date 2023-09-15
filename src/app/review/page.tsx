import ReviewFetchMore from '@/components/Review/list/ReviewFetchMore';
import ReviewFetchMoreSuspense from '@/components/Review/list/ReviewFetchMoreSuspense';
import ReviewFilteringBox from '@/components/Review/list/ReviewFilteringBox';
import { Suspense } from 'react';

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export const dynamic = 'force-static';
export const revalidate = 1;

const ReviewListPage = ({ searchParams }: Props) => {
  return (
    <div>
      <ReviewFilteringBox />

      <Suspense fallback={<ReviewFetchMoreSuspense />}>
        <ReviewFetchMore searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ReviewListPage;
