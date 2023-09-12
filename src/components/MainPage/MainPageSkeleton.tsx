import React from 'react';
import KeywordButtons from './MainPageMovies/KeywordButtons';
import { ArrowRight, ArrowRight2 } from '@/styles/icons/Icons24';

const MainPageSkeleton = ({ params }: { params: string }) => {
  const listData = new Array(6).fill(null);
  const latestReview = new Array(4).fill(null);
  return (
    <main className="w-full overflow-x-hidden">
      <section className="my-8">
        <div className="flex relative items-end md:flex-row my-[120px] justify-between">
          <h2 className="h3_suit mx-auto xl:text-6xl leading-[72px]">😎장르별 인기 영화</h2>
          <div className="flex absolute right-11 bottom-[-45px] mt-4 md:mr-[190px]">
            더보기 <ArrowRight2 />
          </div>
        </div>
        <div className="p-2 mx-5 md:mx-32">
          <KeywordButtons params={params} />
        </div>

        <div className="animate-pulse bg-GreyScaleGrey flex justify-center w-full rounded-md my-3 h-[195px] sm:h-[230px] xl:h-[460px]"></div>
        <div className="flex flex-wrap justify-center items-center mx-11 sm:grid sm:grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:flex">
          {listData.map((data, idx: number) => (
            <div key={idx} className="w-auto md:w-[240px]">
              <div className="w-[140px] sm:w-[240px] flex flex-col gap-3">
                <div className="relative">
                  <div className="animate-pulse bg-GreyScaleGrey w-[140px] h-[210px] sm:w-[240px] sm:h-[360px] rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex-row lg:flex xl:mt-[360px]">
        <div className="sm:w-1/2 mb-8 md:mb-0 mr-5 lg:mb-[160px] 2xl:ml-[192px]">
          <div className="p-5">
            <div className="flex justify-between items-end">
              <h1 className="h3_suit xl:text-6xl leading-[72px]">🧐최신 리뷰</h1>
              <div className="flex">
                더보기 <ArrowRight2 />
              </div>
            </div>
            <div className="p-5">
              {latestReview?.map((data, index) => {
                return (
                  <div key={index} className="w-full mb-16 m-4 shadow-neutral-400">
                    <div
                      className={`animate-pulse p-5 px-7 border border-opacity-20 bg-GreyScaleGrey rounded-[20px] shadow h-36`}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="sm:w-1/2 2xl:mr-[192px]">
          <div className="p-5">
            <h1 className="h3_suit mx-auto xl:text-6xl leading-[72px]">🍿최근 개봉 영화</h1>
            <div className="flex justify-center items-center w-full">
              <div className="hidden xl:block w-full p-5 h-full md:h-[608px] font-thin text-xl my-3 mr-5">
                <div className="animate-pulse relative w-full h-full sm:w-auto md:h-[608px] shadow border rounded-[20px] border-gray-200 bg-GreyScaleGrey overflow-hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" bg-GreyScaleWhite2">
        <div className="md:mx-[190px] py-[100px]">
          <div className="flex flex-col sm:flex-wrap justify-between items-end mt-[100px] mb-[120px]">
            <h1 className="h3_suit mx-auto xl:text-6xl leading-[72px]">🔥지금 핫한 토픽</h1>
            <div className="flex p-5 sm:p-0">
              더보기 <ArrowRight2 />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {listData!.map((post, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-GreyScaleWhite p-4 rounded-md relative flex flex-col justify-between"
              >
                <div className="mb-8">
                  <div className="text-lg font-semibold"></div>
                  <div className="text-xl font-bold mb-2"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-GreyScaleSilverGrey rounded-md p-3 mt-4">
                  <div className="text-sm font-medium">👆투표수 💬댓글수</div>
                  <div className="absolute bottom-2 right-2 text-3xl text-gray-400">
                    <ArrowRight />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPageSkeleton;
