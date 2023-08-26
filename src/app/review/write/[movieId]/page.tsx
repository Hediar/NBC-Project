import React from 'react';
import ReviewWriteTemplate from '@/components/ReviewForm/ReviewWriteTemplate';

interface Params {
  movieId: string;
}

type Props = {
  params: Params;
};

const ReviewPage = ({ params }: Props) => {
  const { movieId } = params;

  return (
    <>
      <ReviewWriteTemplate paramMovieId={movieId} />
    </>
  );
};

export default ReviewPage;
