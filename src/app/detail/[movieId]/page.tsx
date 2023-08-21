import MovieDetailInfo from '@/components/MovieDetail/MovieDetailInfo';
import { Params } from '@/types/types';
import React from 'react';

type Props = {
  params: Params;
};

const MovieDetail = ({ params }: Props) => {
  const { movieId } = params;

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <MovieDetailInfo movieId={movieId} />
    </div>
  );
};

export default MovieDetail;
