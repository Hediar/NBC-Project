import { Plus, StarFill } from '@/styles/icons/Icons24';
import Link from 'next/link';
import React from 'react';

type Props = {};

const MyReviewListLoading = (props: Props) => {
  const REPEAT_NUMBER = 3;
  const lists = Array.from(Array(REPEAT_NUMBER), (x) => <MyReviewItemLoading key={Math.random()} />);

  return (
    <div>
      <div className="mb-[300px] w-full">
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2 w-full">
          <li className="flex items-center justify-center px-10 py-5 border-dashed border-2 border-zinc-300 rounded-2xl bg-neutral-50 ">
            <Link
              href={`/review/write`}
              className="button-dark subtitle1_suit !flex items-center gap-[6px] !py-[10px] !px-5"
            >
              리뷰 작성하기
              <Plus />
            </Link>
          </li>

          {lists}
        </ul>
      </div>
    </div>
  );
};

export const MyReviewItemLoading = () => {
  return (
    <li className="min-h-[384px] skeleton-ui">
      <div className="overflow-hidden flex flex-col relative w-full h-full p-5 pb-4 rounded-2xl shadow sm:p-10 sm:pb-8">
        <div className="absolute top-0 left-0 w-full h-[90px] px-[40px] pt-[18px] bg-gradient-to-l from-orange-200 to-violet-200"></div>
        <div className="flex flex-col items-center gap-5 relative z-[1] sm:flex-row sm:items-start">
          <div className="overflow-hidden w-40 max-h-60 rounded-xl skeleton-img h-full">{/* 프로필사진 */}</div>

          <div className="w-full text-center sm:text-left">
            <div className="body3_suit text-neutral-800 skeleton-text">{/* 날짜 */}</div>
            <strong className="body1_bold_suit mt-1 skeleton-text inline-block">{/* 영화제목 */}</strong>
            <div className="flex justify-center gap-1 mt-[22px] sm:justify-start">
              <StarFill className="w-4" />
              <span className="text-neutral-800 text-[13px] font-normal">0.0</span>
            </div>
            <p className="body1_regular_suit mt-3 skeleton-text w-full mb-[6px]">{/* 한줄평 */}</p>
            <p className="body1_regular_suit skeleton-text w-full">{/* 메모 */}</p>
          </div>
        </div>

        <ul className="flex flex-wrap items-center justify-center content-center gap-2 flex-1 mt-3">
          <li className="!min-w-[70px] !min-h-[29px] px-3 py-1.5 border border-white justify-center items-center gap-2.5 inline-flex body2_suit skeleton-text ">
            {/* 태그 */}
          </li>
        </ul>
      </div>
    </li>
  );
};

export default MyReviewListLoading;
