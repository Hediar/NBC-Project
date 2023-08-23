import React from 'react';
import ReviewMovie from '@/components/ReviewForm/ReviewMovie';
import ReviewForm from '@/components/ReviewForm/ReviewForm';

interface Params {
  movieId: string;
}

type Props = {
  params: Params;
};

const ReviewPage = async ({ params }: Props) => {
  const { movieId } = params;

  return (
    <>
      <ReviewMovie movieId={movieId} />
      <ReviewForm movieId={movieId} />
    </>
  );
};

export default ReviewPage;
