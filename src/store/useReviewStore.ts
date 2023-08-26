import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useReviewStore = create(
  persist(
    (set, _) => ({
      tempReview: null,
      saveTempReview: (newTempReview: any) => set(() => ({ tempReview: newTempReview }))
    }),
    {
      name: 'review-storage'
    }
  )
);

export const useReviewMovieStore = create((set) => {
  return {
    searchMovieId: null,
    saveSearchMovieId: (newMovieId: any) => {
      set({ searchMovieId: newMovieId });
    }
  };
});
