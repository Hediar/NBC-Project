import { create } from 'zustand';

interface ToggleSignUpModal {
  isSignUpModalOpen: boolean;
  setIsSignUpModalOpen: (isOpen: boolean) => void;
}

const useToggleSignUpModal = create<ToggleSignUpModal>((set) => {
  return {
    isSignUpModalOpen: false,
    setIsSignUpModalOpen: (isSignUpModalOpen: boolean) => {
      set({ isSignUpModalOpen: !isSignUpModalOpen });
    }
  };
});

export default useToggleSignUpModal;
