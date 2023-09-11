import { create } from 'zustand';

interface ToggleIsProfileSelected {
  target: number | null;
  isSelected: boolean;
  setIsProfileSelected: (key: number | null, isSelected: boolean) => void;
}

const useIsProfileSelected = create<ToggleIsProfileSelected>((set) => {
  return {
    target: null,
    isSelected: false,
    setIsProfileSelected: (key: number | null, isSelected: boolean) => set({ target: key, isSelected })
  };
});

export default useIsProfileSelected;
