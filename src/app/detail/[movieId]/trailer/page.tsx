import { getMovieDetail } from '@/api/tmdb';
import MovieDetailTrailer from '@/components/MovieDetail/trailer-photo/MovieDetailTrailer';
import React from 'react';

interface Props {
  params: {
    movieId: string;
  };
}

const DetailTrailerPage = async ({ params }: Props) => {
  const { movieId } = params;
  const movieData = await getMovieDetail(movieId);

  return (
    <div>
      <MovieDetailTrailer movieData={movieData} />
    </div>
  );
};

export default DetailTrailerPage;
