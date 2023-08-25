import { create } from 'zustand';

interface SaveCurrentURLState {
  currentURL: string;
  saveCurrentURL: (url: string) => void;
  deleteCurrentURL: () => void;
}

const SaveCurrentURLStore = create<SaveCurrentURLState>((set) => {
  return {
    currentURL: '',
    saveCurrentURL: (url: string) => {
      set({ currentURL: url });
    },
    deleteCurrentURL: () => {
      set({ currentURL: '' });
    }
  };
});

export default SaveCurrentURLStore;
