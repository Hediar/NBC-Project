import MovieDetailQuickRating from '@/components/MovieDetail/rating/MovieDetailQuickRating';
import { Params } from '@/types/types';
import React from 'react';

type Props = {
  params: Params;
};

const page = ({ params }: Props) => {
  const { movieId } = params;

  return (
    <div>
      <MovieDetailQuickRating movieId={movieId} />
    </div>
  );
};

export default page;
