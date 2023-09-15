import MainPage from '@/components/MainPage/MainPage';
import MainPageSkeleton from '@/components/MainPage/MainPageSkeleton';
import { Suspense } from 'react';

const GenreMovies = ({ params }: { params: { genreId: string } }) => {
  const { genreId } = params;
  return (
    <Suspense fallback={<MainPageSkeleton params={genreId} />}>
      <MainPage params={genreId} />
    </Suspense>
  );
};

export default GenreMovies;
