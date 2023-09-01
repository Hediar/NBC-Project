import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReturnTypes {
  tempReview: ReviewsTable | null;
  saveTempReview: (newTempReview?: ReviewsTable) => void;
}
export const useReviewStore = create(
  persist<ReturnTypes>(
    (set, _) => ({
      tempReview: null,
      saveTempReview: (newTempReview?: ReviewsTable) => set(() => ({ tempReview: newTempReview }))
    }),
    {
      name: 'review-storage'
    }
  )
);

interface ReturnMovieTypes {
  searchMovieId: number | string | null;
  // searchMovieInfo: MovieData | null;
  saveSearchMovieId: (newMovieId?: number | string | null) => void;
  // saveSearchMovieInfo: (newMovieInfo?: MovieData | null) => void;
}
export const useReviewMovieStore = create<ReturnMovieTypes>((set) => {
  return {
    searchMovieId: null,
    // searchMovieInfo: null,
    saveSearchMovieId: (newMovieId?) => {
      set({ searchMovieId: newMovieId });
    }
    // saveSearchMovieInfo: (newMovieInfo?) => {
    //   set({ searchMovieInfo: newMovieInfo });
    // },
  };
});

interface ReturnSearchModalTypes {
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
}
export const useSearchModalStore = create<ReturnSearchModalTypes>((set) => {
  return {
    isSearchModalOpen: false,
    openSearchModal: () => {
      set({ isSearchModalOpen: true });
    },
    closeSearchModal: () => {
      set({ isSearchModalOpen: false });
    }
  };
});
