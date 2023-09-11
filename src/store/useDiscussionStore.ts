import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DiscussionTable {
  title: string | null;
  content: string | null;
  movieId: string | null;
  options: string[] | null;
}

export const useDiscussionStore = create(
  persist(
    (set) => ({
      bears: 0,
      saveTempDiscussion: (newTempDiscussion?: DiscussionTable) => set(() => ({ tempDiscussion: newTempDiscussion }))
    }),
    {
      name: 'discussion-storage'
    }
  )
);
