import { create } from 'zustand';

type SavedUserInfo = Database['public']['Tables']['users']['Update'];
interface SaveUserInfoState {
  userInfo: SavedUserInfo;
  saveUserInfo: (userInfo: SavedUserInfo) => void;
  deleteUserInfo: () => void;
}

const useUserInfoStore = create<SaveUserInfoState>((set) => {
  return {
    userInfo: { avatar_url: '', id: '', name: '', username: '' },
    saveUserInfo: (userInfo: SavedUserInfo) => {
      set({ userInfo });
    },
    deleteUserInfo: () => {
      set({ userInfo: { avatar_url: '', id: '', name: '', username: '' } });
    }
  };
});

export default useUserInfoStore;
