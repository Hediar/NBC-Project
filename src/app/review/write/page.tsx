// 임시 추가Q:: .../review/write로 링크걸면 .../review/[postId]로 이동되는 오류

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
