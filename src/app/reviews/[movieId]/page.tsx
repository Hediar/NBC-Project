import React from 'react';
import ReviewMovie from '@/components/ReviewForm/ReviewMovie';
import ReviewForm from '@/components/ReviewForm/ReviewForm';
import SearchPopup from '@/components/ReviewForm/SearchPopup';

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
      <SearchPopup />
      <ReviewMovie movieId={movieId} />
      <ReviewForm movieId={movieId} />
    </>
  );
};

export default ReviewPage;
