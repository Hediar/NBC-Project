'use client';

import SearchPopup from './SearchPopup';
import ReviewMovie from './ReviewMovie';
import ReviewForm from './ReviewForm';
import { useReviewMovieStore, useSearchModalStore } from '../../store/useReviewStore';
import { useEffect } from 'react';

type Props = {
  paramMovieId?: string;
  editReview?: ReviewsTable;
};

const ReviewWriteTemplate = ({ paramMovieId, editReview }: Props) => {
  const { isSearchModalOpen, openSearchModal } = useSearchModalStore();

  const { searchMovieId, saveSearchMovieId } = useReviewMovieStore();
  const movieId = searchMovieId ? (searchMovieId as string) : paramMovieId;

  useEffect(() => {
    return saveSearchMovieId();
  }, []);

  return (
    <>
      {movieId ? (
        <ReviewMovie movieId={movieId} />
      ) : (
        <button
          onClick={() => {
            openSearchModal();
          }}
        >
          리뷰 남길 콘텐츠 고르기
        </button>
      )}
      {isSearchModalOpen && <SearchPopup />}

      <ReviewForm movieId={movieId} editReview={editReview} />
    </>
  );
};

export default ReviewWriteTemplate;
