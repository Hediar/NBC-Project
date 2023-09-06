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
      <section>
        <div className="flex justify-between items-end">
          <h2 className="h1_suit">😎장르별 인기 영화</h2>
          <Link href={'/movielist'} className="flex">
            더보기 <ArrowRight2 />
          </Link>
        </div>
        <div className="p-2">
          <KeywordButtons params={'all'} />
        </div>
      </section>
      <TrendMoives genreId={'all'} />
      <div className="flex">
        <LatestReviews />
        <LatestMovies />
      </div>
      <HotTopics />
    </main>
  );
}
