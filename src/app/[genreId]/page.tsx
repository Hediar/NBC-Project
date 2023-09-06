import HotTopics from '@/components/MainPage/HotTopics';
import LatestMovies from '@/components/MainPage/LatestMovies';
import LatestReviews from '@/components/MainPage/LatestReviews';
import KeywordButtons from '@/components/MainPage/MainPageMovies/KeywordButtons';
import TrendMoives from '@/components/MainPage/MainPageMovies/TrendMoives';
import { ArrowRight2 } from '@/styles/icons/Icons24';
import Link from 'next/link';

export const revalidate = 0;

const GenreMovies = ({ params }: { params: { genreId: string } }) => {
  const { genreId } = params;
  return (
    <main>
      <section className="my-8">
        <div className="flex flex-col items-end my-[120px] md:flex-row md:justify-between">
          <h2 className="h1_suit">😎장르별 인기 영화</h2>
          <Link href={'/movielist'} className="flex mt-4 mr-[190px] md:mt-0">
            더보기 <ArrowRight2 />
          </Link>
        </div>
        <div className="p-2 mx-32">
          <KeywordButtons params={params.genreId} />
        </div>
        <TrendMoives genreId={genreId} />
      </section>
      <section className="mt-[180px] mb-[160px] flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-8 md:mb-0 mr-[58px]">
          <LatestReviews />
        </div>
        <div className="md:w-1/2">
          <LatestMovies />
        </div>
      </section>
      <section className=" bg-GreyScaleWhite2">
        <HotTopics />
      </section>
    </main>
  );
};

export default GenreMovies;
