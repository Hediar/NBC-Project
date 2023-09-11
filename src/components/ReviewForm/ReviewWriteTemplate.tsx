'use client';

import SearchPopup from './SearchPopup';
import ReviewMovie from './ReviewMovie';
import ReviewForm from './ReviewForm';
import { useReviewMovieStore, useSearchModalStore } from '../../store/useReviewStore';
import { useEffect, useRef } from 'react';

type Props = {
  paramMovieId?: string;
  editReview?: ReviewsTable;
};

const ReviewWriteTemplate = ({ paramMovieId, editReview }: Props) => {
  const { openSearchModal } = useSearchModalStore();

  const { searchMovieId, saveSearchMovieId } = useReviewMovieStore();
  const movieId = searchMovieId ? (searchMovieId as string) : paramMovieId;

  const movieButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => {
      saveSearchMovieId();
    };
  }, []);

  return (
    <>
      <h2 className="mt-10 h3_suit">리뷰 작성</h2>
      <div className="info-box">
        {movieId ? (
          <ReviewMovie movieId={movieId} />
        ) : (
          <div className="flex items-center justify-center w-full h-[152px] text-center mx-auto">
            <button
              onClick={() => {
                openSearchModal();
              }}
              ref={movieButtonRef}
              className="button-dark !px-5 !py-2.5 !text-2xl"
            >
              리뷰 남길 콘텐츠 고르기
            </button>
          </div>
        )}
      </div>
      <SearchPopup />

      <ReviewForm movieId={movieId} editReview={editReview} movieButtonRef={movieButtonRef} />
    </>
  );
};

export default ReviewWriteTemplate;
