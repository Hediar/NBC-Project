'use client';

import React from 'react';
import SearchPopup from './SearchPopup';
import ReviewMovie from './ReviewMovie';
import ReviewForm from './ReviewForm';
import { useReviewMovieStore } from '../../store/useReviewStore';

type Props = {
  paramMovieId?: string;
  editReview?: ReviewsTable;
};

const ReviewWriteTemplate = ({ paramMovieId, editReview }: Props) => {
  const { searchMovieId } = useReviewMovieStore();
  const movieId = searchMovieId ? (searchMovieId as string) : paramMovieId;

  return (
    <>
      <SearchPopup />
      {movieId ? <ReviewMovie movieId={movieId} /> : <button>리뷰 남길 영화 고르기</button>}
      <ReviewForm movieId={movieId} editReview={editReview} />
    </>
  );
};

export default ReviewWriteTemplate;
