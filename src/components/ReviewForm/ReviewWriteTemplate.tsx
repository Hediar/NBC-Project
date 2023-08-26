'use client';

import React from 'react';
import SearchPopup from './SearchPopup';
import ReviewMovie from './ReviewMovie';
import ReviewForm from './ReviewForm';
import { useReviewMovieStore } from '../../store/useReviewStore';

type Props = {
  paramMovieId: string;
};

const ReviewWriteTemplate = ({ paramMovieId }: Props) => {
  const { searchMovieId }: any = useReviewMovieStore();
  const movieId = searchMovieId ? searchMovieId : paramMovieId;

  return (
    <>
      <SearchPopup />
      {movieId ? <ReviewMovie movieId={movieId} /> : <button>리뷰 남길 영화 고르기</button>}
      <ReviewForm movieId={movieId} />
    </>
  );
};

export default ReviewWriteTemplate;
