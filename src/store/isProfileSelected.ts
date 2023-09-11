import { create } from 'zustand';

interface ToggleIsProfileSelected {
  isProfileSelected: boolean;
  setIsProfileSelected: (toggle: boolean) => void;
}

const useIsProfileSelected = create<ToggleIsProfileSelected>((set) => {
  return {
    isProfileSelected: false,
    setIsProfileSelected: (toggle: boolean) => set({ isProfileSelected: toggle })
  };
});

export default useIsProfileSelected;
