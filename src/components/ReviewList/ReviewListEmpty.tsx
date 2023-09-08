import { SVGFile } from '@/styles/icons/IconsETC';
import Link from 'next/link';
import React from 'react';

const ReviewListEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center my-28">
      <p className="h3_suit mb-16">작성한 리뷰가 없습니다.</p>
      <SVGFile />
      <Link
        href={`/review/write`}
        className="button-dark subtitle1_suit mt-16 !py-[10px] !px-5"
      >
        리뷰 작성하기
      </Link>
    </div>
  );
};

export default ReviewListEmpty;
