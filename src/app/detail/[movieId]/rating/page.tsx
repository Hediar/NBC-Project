import MovieDetailQuickRating from '@/components/MovieDetail/rating/MovieDetailQuickRating';
import React from 'react';

interface Props {
  params: { movieId: string };
}

const DetailRatingPage = ({ params }: Props) => {
  const { movieId } = params;

  return (
    <div>
      <MovieDetailQuickRating movieId={movieId} />
    </div>
  );
};

export default DetailRatingPage;
