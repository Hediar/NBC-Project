import { ArrowRight, ArrowRight2 } from '@/styles/icons/Icons24';
import React from 'react';

const RelatedDiscussionListSuspense = () => {
  const DUMMY_NUMBER = 4;
  const lists = new Array(DUMMY_NUMBER).fill(0);
  return (
    <div className="mt-10 w-full sm:min-h-screen rounded-xl sm:rounded-none sm:relative sm:pl-[2%]">
      <div className="w-full flex justify-between">
        <p className="font-bold text-xl h3_suit">관련 토픽</p>
        <div className="flex text-neutral-800 text-base lg:text-xl font-normal leading-normal p-2 lg:p-1">
          전체보기
          <ArrowRight2 />
        </div>
      </div>
      {lists?.map((_, idx) => {
        return (
          <React.Fragment key={idx}>
            <RelatedDiscussionPost />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RelatedDiscussionListSuspense;

const RelatedDiscussionPost = () => {
  return (
    <div className="w-full mt-5 border border-[#EBEBEB] rounded-[20px] bg-white shadow1 pointer-events-none flex flex-col">
      <div className="flex flex-col gap-2 p-5">
        <p className="body1_regular_suit bg-slate-200 h-[22px] rounded-lg"></p>
        <p className="subtitle2_suit bg-slate-200 h-[24px] rounded-lg"></p>
      </div>

      <div className="bg-[#EBEBEB] rounded-b-[20px] w-full p-5 flex flex-col">
        <div className="flex gap-5 justify-between items-center body1_bold_suit">
          <div className="flex gap-3 bg-slate-200 w-1/2 h-[24px] rounded-lg">
            <span></span>
          </div>

          <div className="flex items-center justify-center text-white pointer-events-auto">
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};
