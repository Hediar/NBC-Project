import HotTopics from '@/components/MainPage/HotTopics';
import LatestMovies from '@/components/MainPage/LatestMovies';
import LatestReviews from '@/components/MainPage/LatestReviews';
import KeywordButtons from '@/components/MainPage/MainPageMovies/KeywordButtons';
import TrendMoives from '@/components/MainPage/MainPageMovies/TrendMoives';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Suspense } from 'react';

export const revalidate = 0;

export default async function Home() {
  return (
    <main>
      <KeywordButtons params={'all'} />
      <TrendMoives genreId={'all'} />
      <LatestReviews />
      {/* <Suspense fallback={<LoadingSpinner />}>
      </Suspense> */}
      <LatestMovies />
      <HotTopics />
    </main>
  );
}
