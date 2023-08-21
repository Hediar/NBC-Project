import MovieDetailInfo from '@/components/MovieDetailInfo';
import React from 'react';

type Props = {
  params: Params;
};

const MovieDetail = ({ params }: Props) => {
  const { movieId } = params;

  return (
    <div>
      <MovieDetailInfo movieId={movieId} />
    </div>
  );
};

export default MovieDetail;
