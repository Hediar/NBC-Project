import MovieInfo from '@/components/MovieInfo';
import React from 'react';

const MovieDetail = (props: any) => {
  const { params } = props;
  const { movieId } = params;

  return (
    <div>
      <MovieInfo movieId={movieId} />
    </div>
  );
};

export default MovieDetail;
