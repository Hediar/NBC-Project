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
  const { isSearchModalOpen, openSearchModal } = useSearchModalStore();

  const { searchMovieId, saveSearchMovieId } = useReviewMovieStore();
  const movieId = searchMovieId ? (searchMovieId as string) : paramMovieId;

  const movieButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return saveSearchMovieId();
  }, []);

  return (
    <>
      <div className="flex items-center w-full h-44 p-5 bg-slate-100 rounded-md">
        {movieId ? (
          <ReviewMovie movieId={movieId} />
        ) : (
          <div className="w-full text-center mx-auto">
            <button
              onClick={() => {
                openSearchModal();
              }}
              ref={movieButtonRef}
              className="mt-4 border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
            >
              리뷰 남길 콘텐츠 고르기
            </button>
          </div>
        )}
      </div>
      {isSearchModalOpen && <SearchPopup />}

      <ReviewForm movieId={movieId} editReview={editReview} movieButtonRef={movieButtonRef} />
    </>
  );
};

export default ReviewWriteTemplate;
