import LatestMovies from '@/components/MainPage/LatestMovies';
import LatestReviews from '@/components/MainPage/LatestReviews';
import KeywordButtons from '@/components/MainPage/MainPageMovies/KeywordButtons';
import TrendMoives from '@/components/MainPage/MainPageMovies/TrendMoives';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <main>
      <KeywordButtons />
      <TrendMoives genreId={'all'} />
      <div className="flex-wrap">
        <div className="basis-1/2">
          <LatestReviews />
        </div>
        <div className="basis-1/2">
          <LatestMovies />
        </div>
      </div>
    </main>
  );
}
