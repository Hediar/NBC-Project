import { create } from 'zustand';

interface ToggleForgotPassword {
  isForgotPasswordOpen: boolean;
  setIsForgotPasswordOpen: (toggle: boolean) => void;
}

const useToggleForgotPassword = create<ToggleForgotPassword>((set) => {
  return {
    isForgotPasswordOpen: false,
    setIsForgotPasswordOpen: (toggle: boolean) => set({ isForgotPasswordOpen: toggle })
  };
});

export default useToggleForgotPassword;
