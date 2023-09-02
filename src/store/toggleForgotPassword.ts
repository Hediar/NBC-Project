import { create } from 'zustand';

interface ToggleForgotPassword {
  isForgotPasswordOpen: boolean;
  setIsForgotPasswordOpen: (isOpen: boolean) => void;
}

const useToggleForgotPassword = create<ToggleForgotPassword>((set) => {
  return {
    isForgotPasswordOpen: false,
    setIsForgotPasswordOpen: (value: boolean) => {
      value === true ? set({ isForgotPasswordOpen: true }) : set({ isForgotPasswordOpen: false });
    }
  };
});

export default useToggleForgotPassword;
