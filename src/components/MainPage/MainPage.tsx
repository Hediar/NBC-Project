import { ArrowRight2 } from '@/styles/icons/Icons24';
import Link from 'next/link';
import React from 'react';
import KeywordButtons from './MainPageMovies/KeywordButtons';
import TrendMoives from './MainPageMovies/TrendMoives';
import LatestReviews from './MainContents/LatestReviews';
import LatestMovies from './MainContents/LatestMovies';
import HotTopics from './MainContents/HotTopics';

const MainPage = ({ params }: { params: string }) => {
  return (
    <main className="w-full overflow-x-hidden">
      <section className="my-8">
        <div className="flex relative items-end md:flex-row my-[120px] justify-between">
          <h2 className="h3_suit mx-auto md:text-6xl leading-[72px]">😎장르별 인기 영화</h2>
          <Link href={'/movielist'} className="flex absolute right-11 bottom-[-45px] mt-4 md:mr-[190px]">
            더보기 <ArrowRight2 />
          </Link>
        </div>
        <div className="p-2 mx-5 md:mx-32">
          <KeywordButtons params={params} />
        </div>
        <TrendMoives genreId={params} />
      </section>
      <section className="flex-row lg:flex xl:mt-[360px]">
        <div className="sm:w-1/2 mb-8 md:mb-0 mr-5 lg:mb-[160px] 2xl:ml-[192px]">
          <LatestReviews />
        </div>
        <div className="sm:w-1/2 2xl:mr-[192px]">
          <LatestMovies />
        </div>
      </section>
      <section className=" bg-GreyScaleWhite2">
        <HotTopics />
      </section>
    </main>
  );
};

export default MainPage;
