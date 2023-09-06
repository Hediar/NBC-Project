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
      <section>
        <div className="flex justify-between items-end">
          <h2 className="h1_suit">😎장르별 인기 영화</h2>
          <Link href={'/movielist'} className="flex">
            더보기 <ArrowRight2 />
          </Link>
        </div>
        <div className="p-2">
          <KeywordButtons params={params.genreId} />
        </div>
      </section>
      <TrendMoives genreId={genreId} />
      <section className="flex">
        <LatestReviews />
        <LatestMovies />
      </section>
      <HotTopics />
    </main>
  );
};

export default GenreMovies;
