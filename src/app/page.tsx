import HotTopics from '@/components/MainPage/HotTopics';
import LatestMovies from '@/components/MainPage/LatestMovies';
import LatestReviews from '@/components/MainPage/LatestReviews';
import KeywordButtons from '@/components/MainPage/MainPageMovies/KeywordButtons';
import TrendMoives from '@/components/MainPage/MainPageMovies/TrendMoives';
import { ArrowRight2 } from '@/styles/icons/Icons24';
import Link from 'next/link';

export const revalidate = 0;

export default async function Home() {
  return (
    <main>
      <section className="my-8">
        <div className="flex flex-col items-end md:flex-row my-[120px] justify-between">
          <h2 className="h3_suit mx-auto md:text-6xl leading-[72px]">😎장르별 인기 영화</h2>
          <Link href={'/movielist'} className="flex mt-4 md:mr-[190px]">
            더보기 <ArrowRight2 />
          </Link>
        </div>
        <div className="p-2 mx-5 md:mx-32">
          <KeywordButtons params={'all'} />
        </div>
        <TrendMoives genreId={'all'} />
      </section>
      <section className="flex-row sm:flex">
        <div className="sm:w-1/2 mb-8 md:mb-0 mr-[58px] lg:mb-[160px] 2xl:ml-[192px]">
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
}
