import ReviewWriteTemplate from '@/components/ReviewForm/ReviewWriteTemplate';
import React from 'react';

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
