'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();
  const { deleteUserInfo } = useUserInfoStore();

  const clickHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await axios.post('/auth/sign-out');
    router.refresh();
    deleteUserInfo();
  };

  return (
    <form>
      <button
        onClick={(e) => clickHandler(e)}
        className="h-full py-2 px-3 rounded-md shadow-sm shadow-gray-700 bg-slate-700 text-white active:bg-slate-600 text-sm flex items-center"
      >
        로그아웃
      </button>
    </form>
  );
};

export default SignOutButton;
