import { create } from 'zustand';

type SavedUserInfo = Database['public']['Tables']['users']['Update'];
interface SaveUserInfoState {
  userInfo: SavedUserInfo | null;
  saveUserInfo: (userInfo: SavedUserInfo) => void;
  deleteUserInfo: () => void;
}

const useUserInfoStore = create<SaveUserInfoState>((set) => {
  return {
    userInfo: null,
    saveUserInfo: (userInfo: SavedUserInfo) => {
      set({ userInfo });
    },
    deleteUserInfo: () => {
      set({ userInfo: null });
    }
  };
});

export default useUserInfoStore;
