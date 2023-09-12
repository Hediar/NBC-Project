import { ArrowRight } from '@/styles/icons/Icons24';
import React from 'react';

const DiscussionDetailSuspense = () => {
  return (
    <div className="animate-pulse">
      <div className="flex">
        <main className="w-full flex flex-col relative">
          <p className="mt-10 h3_suit">토론 상세</p>
          <div className="flex items-center w-full mt-5 px-5 lg:px-10 py-5 rounded-[20px] shadow1 border sm:w-2/3 ">
            <div className="h-full relative">
              <div>
                <div className="rounded-lg w-[100px] h-[150px] bg-slate-200" />
              </div>
            </div>
            <div className="flex flex-col gap-3 ml-3">
              <div>
                <div className="body1_bold_suit sm:text-[24px] sm:leading-[30px] h-[30px] bg-slate-200 min-w-[100px] rounded-lg"></div>
              </div>

              <div className="caption_suit sm:text-[16px] sm:leading-[22px] text-[#888888]">
                <div className="flex h-[94px] bg-slate-200 w-[300px] rounded-lg">
                  {/* 연도 */}
                  <div className=""></div>
                  {/* 장르 */}
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>

          <DiscussionTopic />
          <DiscussionCommentContainer />

          <section className="w-full sm:absolute sm:w-1/3 sm:left-2/3">
            <RelatedDiscussionList />
          </section>
        </main>
      </div>
    </div>
  );
};

export default DiscussionDetailSuspense;

const DiscussionTopic = () => {
  return (
    <div className="mt-[50px] sm:w-2/3">
      <h3 className="h3_suit flex">이 영화 토픽</h3>
      <div className="flex flex-col justify-between">
        <header className="w-full h-[60px] mt-10 rounded-[20px] bg-slate-100 flex gap-3 items-center px-6">
          <div>
            <div className="rounded-full w-[40px] h-[40px] bg-slate-200" />
          </div>
          <span className="subtitle2_suit"></span>
        </header>

        <section className="min-h-[438px] p-3 xl:px-[62px] sm:py-[54px] flex flex-col items-center relative mt-5 border border-[#888888] rounded-[40px]">
          <div className="flex flex-col flex-wrap justify-center items-center flex-1 w-full gap-[10px] py-5 leading-snug">
            <p className="w-4/5 h-[20px] bg-slate-200 rounded-lg"></p>
            <p className="body1_regular_suit text-[#888888] whitespace-normal break-all"></p>
          </div>

          <div className="h-[272px] w-4/5 flex items-center bg-slate-200 rounded-lg">{/* 선택지칸 */}</div>
        </section>

        <div className="mb-10"></div>

        <div className="border-b"></div>

        <div className="body1_bold_suit flex gap-5 my-10">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

const DiscussionCommentContainer = () => {
  return (
    <div className="w-full flex flex-col gap-4 sm:w-2/3">
      <div className="w-full flex gap-2 items-center">
        <CommentInput />
      </div>

      <DisplayComments />
    </div>
  );
};

const CommentInput = () => {
  return (
    <div className="flex w-full gap-2">
      <div className="w-full border rounded-xl flex px-[20px] py-[12px] justify-between">
        <textarea className="w-5/6 h-[92px] border-none resize-none focus:outline-none text-base" />
        <div className="self-end"></div>
        <div className="self-end">
          <button className="primary_small_default_noIcon"></button>
        </div>
      </div>
    </div>
  );
};

const DisplayComments = () => {
  const displayComments = [0, 1, 2].map((comment, idx) => {
    return (
      <div
        key={idx}
        className="flex flex-col gap-3 w-full min-h-[142px] text-sm mb-2 p-5 border rounded-[20px] bg-slate-100"
      >
        <div className="w-full flex items-center gap-3">
          <div>
            <div className="h-8 w-8 rounded-full bg-slate-200" />
          </div>
          <div className="h-[24px] w-full bg-slate-200"></div>
        </div>

        <div className="w-11/12 flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <p className="body1_regular_suit whitespace-normal break-all"></p>
          </div>
          <div className="flex gap-2 w-full h-[24px] items-center bg-slate-200">
            <span></span>
            {/* <button>답글</button> */}
            <span></span>
          </div>
        </div>
      </div>
    );
  });

  return <div>{displayComments}</div>;
};

const RelatedDiscussionList = () => {
  const DUMMY_NUMBER = 4;
  const lists = new Array(DUMMY_NUMBER).fill(0);
  return (
    <div className="w-full bg-[#EBEBEB] sm:min-h-screen p-10 sm:pr-0 sm:mx-10 rounded-xl sm:rounded-none">
      <p className="font-bold text-xl h3_suit">관련 토픽</p>

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
