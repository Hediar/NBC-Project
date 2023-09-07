import Link from 'next/link';
import React from 'react';

const ReviewListEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center  my-56  ">
      <p className="font-bold text-2xl">작성한 리뷰가 없습니다.</p>
      <Link
        href={`/review/write`}
        className="mt-4 border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
      >
        리뷰 작성하기
      </Link>
    </div>
  );
};

export default ReviewListEmpty;
