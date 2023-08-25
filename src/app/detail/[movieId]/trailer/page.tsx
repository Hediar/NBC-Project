import { getMovieDetail } from '@/api/tmdb';
import MovieDetailTrailer from '@/components/MovieDetail/trailer-photo/MovieDetailTrailer';
import { Params } from '@/types/types';
import React from 'react';

type Props = {
  params: Params;
};

const page = async ({ params }: Props) => {
  const { movieId } = params;
  const movieData = await getMovieDetail(movieId);

  return (
    <div>
      <MovieDetailTrailer movieData={movieData} />
    </div>
  );
};

export default page;
