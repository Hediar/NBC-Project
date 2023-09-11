import { create } from 'zustand';

interface ToggleSignUpModal {
  isModalOpen: boolean;
  setIsModalOpen: (toggle: boolean) => void;
}

const useToggleSignUpModal = create<ToggleSignUpModal>((set) => {
  return {
    isModalOpen: false,
    setIsModalOpen: (value: boolean) => set({ isModalOpen: value })
  };
});

export default useToggleSignUpModal;
