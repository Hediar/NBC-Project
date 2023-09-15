import MovieDetailTrailer from '@/components/MovieDetail/trailer-photo/MovieDetailTrailer';
import MovieDetailTrailerSuspense from '@/components/MovieDetail/trailer-photo/MovieDetailTrailerSuspense';
import React, { Suspense } from 'react';

interface Props {
  params: {
    movieId: string;
  };
}

const DetailTrailerPage = async ({ params }: Props) => {
  const { movieId } = params;

  return (
    <div>
      <Suspense fallback={<MovieDetailTrailerSuspense />}>
        <MovieDetailTrailer movieId={movieId} />
      </Suspense>
    </div>
  );
};

export default DetailTrailerPage;
