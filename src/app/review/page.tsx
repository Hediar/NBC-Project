import ReviewFetchMore from '@/components/Review/list/ReviewFetchMore';
import ReviewFilteringBox from '@/components/Review/list/ReviewFilteringBox';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ReviewListPage = ({ searchParams }: Props) => {
  return (
    <div>
      <Link
        href={`/review/write`}
        className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
      >
        + 리뷰작성
      </Link>

      <ReviewFilteringBox />
      <ReviewFetchMore searchParams={searchParams} />
    </div>
  );
};

export default ReviewListPage;
