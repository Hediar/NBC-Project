import { StarLined } from '@/styles/icons/Icons32';
import React from 'react';
import { HeartLined } from '@/styles/icons/Icons32';

const loading = () => {
  return (
    <div className="skeleton-ui">
      <p className="mt-10 h3_suit">리뷰 상세</p>
      <div className="flex items-center w-full mt-5 mb-10 px-10 py-5 rounded-[20px] shadow1 border">
        <div className="h-full relative">
          <div className="skeleton-img w-[100px] h-[150px]">{/* 영화 포스터 */}</div>
        </div>
        <div className="flex flex-col gap-3 ml-3">
          <strong className="h4_suit skeleton-text min-h-[28px]:">{/* 영화제목 */}</strong>
          <div className=" body1_regular_suit text-[#888888]">
            <div className="flex mb-[6px]">
              <div className="skeleton-text !w-10">{/* 개봉일 */}</div>
              <div className="flex items-center justify-center p-1">
                <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="1" cy="1" r="1" fill="#888888" />
                </svg>
              </div>
              <div className="skeleton-text !w-28">{/* 장르 */}</div>
            </div>
            <div className="skeleton-text !w-6">{/* 나라 */}</div>
            <div>00분</div>
            <div className="skeleton-text !w-20">{/* 시청가능연령대 */}</div>
          </div>
        </div>
      </div>

      {/* 컨텐츠 S */}
      <div className="overflow-hidden mb-4 rounded-[20px] border border-zinc-500">
        <div className="flex items-center h-[60px] px-5 py-2 ">
          <div className="w-10 h-10 bg-white !rounded-full border border-gray-200 overflow-hidden skeleton-img">
            {/* 프로필사진 */}
          </div>
          <div className="ml-2 text-neutral-800 text-base font-bold leading-snug skeleton-text">{/* 유저 이름 */}</div>
          <span className="ml-5 text-neutral-800 text-sm font-normal skeleton-text">{/* 작성일 */}</span>
        </div>

        <div className="flex flex-col items-center gap-6 py-14 px-5  bg-neutral-50 border-y  text-neutral-800 text-base font-normal">
          <div className="skeleton-text">{/* 관람일 */}</div>

          <ul className="flex flex-wrap gap-3 justify-center">
            <li className="min-w-[70px] h-[38px] px-4 py-2 bg-white justify-center items-center gap-2.5 inline-flex text-neutral-800 text-base font-normal leading-snug skeleton-text">
              {/* 태그 */}{' '}
            </li>
          </ul>

          <div className="skeleton-text w-1/2">{/* 리뷰 */}</div>
          <div className="flex items-center gap-1">
            <span className="flex w-40">
              <StarLined />
              <StarLined />
              <StarLined />
              <StarLined />
              <StarLined />
            </span>
            <span className="text-center text-zinc-500 text-xs font-normal leading-none">0.0</span>
          </div>
          <pre className="skeleton-text w-1/2">{/* 메모 */}</pre>
        </div>

        <div className="flex justify-center items-center h-16 px-5 ">
          <div className="flex items-center gap-1">
            <HeartLined className="cursor-pointer animate-200 hover:scale-110" />
            <span className="body2_suit">0</span>
          </div>
        </div>
      </div>
      {/* 컨텐츠 E */}
    </div>
  );
};

export default loading;
