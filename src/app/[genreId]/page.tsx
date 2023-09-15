import MainPage from '@/components/MainPage/MainPage';
import MainPageSkeleton from '@/components/MainPage/MainPageSkeleton';
import { Suspense } from 'react';

<<<<<<< HEAD
export const revalidate = 0;

=======
>>>>>>> 2967403e46a0fe4e6e86b03dd103ba2c34799f00
const GenreMovies = ({ params }: { params: { genreId: string } }) => {
  const { genreId } = params;
  return (
    <Suspense fallback={<MainPageSkeleton params={genreId} />}>
      <MainPage params={genreId} />
    </Suspense>
  );
};

export default GenreMovies;
