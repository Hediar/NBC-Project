import { create } from 'zustand';

interface ToggleSignInModal {
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (toggle: boolean) => void;
}

const useToggleSignInModal = create<ToggleSignInModal>((set) => {
  return {
    isSignInModalOpen: false,
    setIsSignInModalOpen: (value: boolean) => set({ isSignInModalOpen: value })
  };
});

export default useToggleSignInModal;
