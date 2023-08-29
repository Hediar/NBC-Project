import { create } from 'zustand';

interface ToggleSignInModal {
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (isOpen: boolean) => void;
}

const useToggleSignInModal = create<ToggleSignInModal>((set) => {
  return {
    isSignInModalOpen: false,
    setIsSignInModalOpen: (isSignInModalOpen: boolean) => {
      set({ isSignInModalOpen: !isSignInModalOpen });
    }
  };
});

export default useToggleSignInModal;
