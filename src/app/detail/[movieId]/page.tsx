import MovieInfo from '@/components/MovieInfo';
import React from 'react';

type Props = {
  params: Params;
};

const MovieDetail = ({ params }: Props) => {
  const { movieId } = params;

  return (
    <div>
      <MovieInfo movieId={movieId} />
    </div>
  );
};

export default MovieDetail;
