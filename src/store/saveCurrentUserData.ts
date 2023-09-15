import { create } from 'zustand';

type SavedUserInfo = Database['public']['Tables']['users']['Row'];
interface SaveUserInfoState {
  userInfo: SavedUserInfo;
  statusChanged: boolean;
  toggleStatus: (statusChanged: boolean) => void;
  saveUserInfo: (userInfo: SavedUserInfo) => void;
  deleteUserInfo: () => void;
}

const initialUserInfo = { avatar_url: '', email: '', id: '', name: '', provider: '', username: '', watched_movies: [] };

const useUserInfoStore = create<SaveUserInfoState>((set) => {
  return {
    userInfo: initialUserInfo,
    statusChanged: false,
    toggleStatus: (statusChanged: boolean) => set({ statusChanged: !statusChanged }),
    saveUserInfo: (userInfo: SavedUserInfo) => {
      set({ userInfo });
    },
    deleteUserInfo: () => {
      set({
        userInfo: initialUserInfo
      });
    }
  };
});

export default useUserInfoStore;
