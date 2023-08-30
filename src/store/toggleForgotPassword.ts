import { create } from 'zustand';

interface ToggleForgotPassword {
  isForgotPasswordOpen: boolean;
  setIsForgotPasswordOpen: (isOpen: boolean) => void;
}

const useToggleForgotPassword = create<ToggleForgotPassword>((set) => {
  return {
    isForgotPasswordOpen: false,
    setIsForgotPasswordOpen: (isForgotPasswordOpen: boolean) => {
      set({ isForgotPasswordOpen: !isForgotPasswordOpen });
    }
  };
});

export default useToggleForgotPassword;
