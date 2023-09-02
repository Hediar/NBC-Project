import { create } from 'zustand';

interface ToggleSignUpModal {
  isSignUpModalOpen: boolean;
  setIsSignUpModalOpen: (isOpen: boolean) => void;
}

const useToggleSignUpModal = create<ToggleSignUpModal>((set) => {
  return {
    isSignUpModalOpen: false,
    setIsSignUpModalOpen: (value: boolean) => {
      value === true ? set({ isSignUpModalOpen: true }) : set({ isSignUpModalOpen: false });
    }
  };
});

export default useToggleSignUpModal;
