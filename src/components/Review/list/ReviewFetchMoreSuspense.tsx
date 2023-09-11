import { HeartLine, StarFill } from '@/styles/icons/Icons24';
import React from 'react';

const ReviewFetchMoreSuspense = () => {
  const REPEAT_NUMBER = 9;
  const lists = Array.from(Array(REPEAT_NUMBER), (x) => <ReviewItem key={Math.random()} />);

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">{lists}</ul>
    </div>
  );
};

const ReviewItem = () => {
  return (
    <li
      className="shadow1 rounded-[20px] min-h-[390px] skeleton-ui
    "
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center px-5 py-3">
          <div className="w-10 h-10 !rounded-full border border-gray-200 overflow-hidden skeleton-img">
            {/* 프로필사진 */}
          </div>
          <div className="pl-2 body1_bold_suit skeleton-text ml-2">{/* 이름 */}</div>
          <span className="pl-5 body2_suit skeleton-text ml-5">{/* 날짜 */}</span>
        </div>

        <div className="relative h-24 px-[40px] pt-[18px] bg-gradient-to-l from-orange-200 to-violet-200">
          <div className="relative flex gap-3 items-center">
            <div className="flex-none w-[60px] h-[90px] skeleton-img">{/* 영화포스터 이미지 */}</div>
            <div>
              <strong className="body1_regular_suit skeleton-text">{/* 영화제목 */}</strong>
              <div className="flex gap-1">
                <StarFill className="w-4" />
                <span className="text-neutral-800 text-[13px] font-normal">0.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end items-center flex-1 pt-10 pb-5 mx-6 ">
          <div className="flex flex-col justify-center items-center gap-[6px] flex-1 w-full body1_regular_suit">
            <p className="skeleton-text w-full h-[22px] ">{/* 한줄평 */}</p>
            <p className="skeleton-text w-full h-[22px] ">{/* 메모 */}</p>
          </div>
          <ul className="flex flex-wrap gap-2 mt-3 mb-[15px] justify-center">
            <li className="!min-w-[70px] !min-h-[29px] px-3 py-1.5 border border-white justify-center items-center gap-2.5 inline-flex body2_suit skeleton-text ">
              {/* 태그 */}
            </li>
          </ul>

          <div className="flex items-center gap-1">
            <HeartLine />
            <span className="body2_suit">0</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReviewFetchMoreSuspense;
