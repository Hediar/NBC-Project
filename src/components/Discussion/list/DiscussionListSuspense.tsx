import React from 'react';

const DiscussionListSuspense = () => {
  const DUMMY_NUMBER = 5;
  const lists = new Array(DUMMY_NUMBER).fill(0);

  return (
    <div className="">
      <div className="animate-pulse flex flex-col gap-5 mt-4">
        {lists?.map((_, idx) => {
          return (
            <div
              key={idx}
              className="h-[174px] sm:min-h-[160px] overflow-auto flex p-2 pb-6 sm:pb-2 items-center border rounded-xl shadow1 relative bg-slate-50"
            >
              <div className="flex bg-slate-200 justify-center items-center p-3">
                <div className="h-[90px] mx-auto flex justify-center">
                  <div className="w-[60px] h-full aspect-[2/3]" />
                </div>
              </div>

              <div className="w-3/5 h-full py-6 sm:h-3/5 sm:p-1 ">
                <div className="w-full h-full overflow-x-auto flex flex-col justify-between sm:gap-1">
                  <p className="h-[14px] absolute top-3 left-5 sm:relative sm:top-auto sm:left-auto bg-slate-200"></p>
                  <p className="h-[24px] bg-slate-200 text-base font-bold"></p>
                  <div>
                    <div className="w-full flex text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                      <div className="h-[29px] px-3 py-1.5 bg-slate-200 w-[100px] rounded-[22px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex">
                        <p className="text-neutral-800 text-sm font-normal leading-[17px]"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-4/5 left-5 bottom-4 body3_suit sm:text-sm break-words m-auto flex items-center justify-between sm:gap-1 sm:w-1/5 sm:bottom-auto sm:left-auto sm:relative sm:flex-col">
                <p className="w-[100px] h-[22px] bg-slate-200"></p>
                <p className="w-[100px] h-[22px] bg-slate-200"></p>
                <p className="w-[100px] h-[22px] bg-slate-200"></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscussionListSuspense;
