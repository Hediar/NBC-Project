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
    <div className="body1_regular_suit flex items-center">
      <button onClick={(e) => clickHandler(e)}>로그아웃</button>
    </div>
  );
};

export default SignOutButton;
