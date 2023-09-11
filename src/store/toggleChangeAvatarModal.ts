import { create } from 'zustand';

interface ToggleChangeAvatarModal {
  isChangeAvatarModalOpen: boolean;
  setIsChangeAvatarModalOpen: (toggle: boolean) => void;
}

const useToggleChangeAvatar = create<ToggleChangeAvatarModal>((set) => {
  return {
    isChangeAvatarModalOpen: false,
    setIsChangeAvatarModalOpen: (value: boolean) => set({ isChangeAvatarModalOpen: value })
  };
});

export default useToggleChangeAvatar;
