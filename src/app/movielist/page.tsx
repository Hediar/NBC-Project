import MainPageLoading from '@/components/MainPage/MainPageLoading';
import MovieList from '@/components/contents/MovieList';
import { Suspense } from 'react';

const MovieListPage = () => {
  return (
    <Suspense fallback={<MainPageLoading />}>
      <MovieList />
    </Suspense>
  );
};

export default MovieListPage;
