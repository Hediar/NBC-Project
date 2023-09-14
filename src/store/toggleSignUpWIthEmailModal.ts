import { create } from 'zustand';

interface ToggleSignUpModal {
  isSignUpWIthEmailModalOpen: boolean;
  setIsSignUpWIthEmailModalOpen: (toggle: boolean) => void;
}

const useToggleSignUpWIthEmailModal = create<ToggleSignUpModal>((set) => {
  return {
    isSignUpWIthEmailModalOpen: false,
    setIsSignUpWIthEmailModalOpen: (value: boolean) => set({ isSignUpWIthEmailModalOpen: value })
  };
});

export default useToggleSignUpWIthEmailModal;
