import LatestReviews from '@/components/MainPage/LatestReviews';
import KeywordButtons from '@/components/MainPage/MainPageMovies/KeywordButtons';
import TrendMoives from '@/components/MainPage/MainPageMovies/TrendMoives';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <>
      <main>
        <KeywordButtons />
        <TrendMoives genreId={'all'} />
        <LatestReviews />
      </main>
    </>
  );
}
