import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DiscussionTable {
  title: string | null;
  content: string | null;
  movieId: string | number | null;
  options?: { text: string }[];
  userId: string;
}

interface ReturnTypes {
  tempDiscussionPost: DiscussionTable | null;
  saveTempDiscussionPost: (newTempReview?: DiscussionTable) => void;
}

export const useDiscussionStore = create(
  persist<ReturnTypes>(
    (set) => ({
      tempDiscussionPost: null,
      saveTempDiscussionPost: (newTempDiscussionPost?: DiscussionTable) =>
        set(() => ({ tempDiscussionPost: newTempDiscussionPost }))
    }),
    {
      name: `discussion-storage`
    }
  )
);
