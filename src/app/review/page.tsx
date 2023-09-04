import ReviewFetchMore from '@/components/Review/list/ReviewFetchMore';
import Link from 'next/link';
// import ReviewList from '@/components/Review/list/ReviewList';

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ReviewListPage = ({ searchParams }: Props) => {
  const sort = searchParams.sort;

  return (
    <div>
      <Link
        href={`/review/write`}
        className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
      >
        + 리뷰작성
      </Link>

      {/* 정렬, 검색필터 - 작업 중 <br />
      필터: 최신, 인기(좋아요), 별점 - ?sort=new | likes | rating <br />
      검색: 전체, 영화제목, 리뷰내용 - ?filter=movie_title | review_cont <br /> */}
      <ReviewFetchMore sort={sort as string} />
    </div>
  );
};

export default ReviewListPage;
