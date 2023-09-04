import HotTopics from '@/components/MainPage/HotTopics';
import LatestMovies from '@/components/MainPage/LatestMovies';
import LatestReviews from '@/components/MainPage/LatestReviews';
import KeywordButtons from '@/components/MainPage/MainPageMovies/KeywordButtons';
import TrendMoives from '@/components/MainPage/MainPageMovies/TrendMoives';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const GenreMovies = ({ params }: { params: { genreId: string } }) => {
  const { genreId } = params;
  return (
    <main>
      <KeywordButtons params={params.genreId} />
      <TrendMoives genreId={genreId} />
      <Suspense fallback={<LoadingSpinner />}>
        <LatestReviews />
      </Suspense>
      <LatestMovies />
      <HotTopics />
    </main>
  );
};

export default GenreMovies;
