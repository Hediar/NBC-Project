import { create } from 'zustand';

interface ToggleSignInModal {
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (isOpen: boolean) => void;
}

const useToggleSignInModal = create<ToggleSignInModal>((set) => {
  return {
    isSignInModalOpen: false,
    setIsSignInModalOpen: (value: boolean) => {
      value === true ? set({ isSignInModalOpen: true }) : set({ isSignInModalOpen: false });
    }
  };
});

export default useToggleSignInModal;
