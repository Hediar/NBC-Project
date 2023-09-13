// userInfo를 null로 수정해야하지만 워낙 연관된 것이 많아서 일단 빈 값들로 설정
import { create } from 'zustand';

type SavedUserInfo = Database['public']['Tables']['users']['Row'];
interface SaveUserInfoState {
  userInfo: SavedUserInfo;
  saveUserInfo: (userInfo: SavedUserInfo) => void;
  deleteUserInfo: () => void;
}

const useUserInfoStore = create<SaveUserInfoState>((set) => {
  return {
    userInfo: { avatar_url: '', email: '', id: '', name: '', provider: '', username: '', watched_movies: [] },
    saveUserInfo: (userInfo: SavedUserInfo) => {
      set({ userInfo });
    },
    deleteUserInfo: () => {
      set({
        userInfo: { avatar_url: '', email: '', id: '', name: '', provider: '', username: '', watched_movies: [] }
      });
    }
  };
});

export default useUserInfoStore;
