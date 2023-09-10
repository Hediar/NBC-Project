'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { SVG_SignOut } from '@/styles/svg/SignOut';
import { message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();
  const { deleteUserInfo } = useUserInfoStore();
  const [messageApi, messageContent] = message.useMessage();

  const clickHandler = async () => {
    await axios.post('/auth/sign-out');
    messageApi.open({ content: '로그아웃 되었습니다.', type: 'success' });
    deleteUserInfo();
    setTimeout(() => {
      router.refresh();
    }, 1500);
  };

  return (
    <>
      {messageContent}
      <div className="body1_regular_suit text-sm sm:text-base  flex items-center">
        <button onClick={clickHandler} className="hidden lg:block hover:font-semibold animate-200">
          로그아웃
        </button>
        <SVG_SignOut
          width={22}
          height={22}
          onClick={clickHandler}
          className="lg:hidden cursor-pointer animate-200 hover:scale-105"
        />
      </div>
    </>
  );
};

export default SignOutButton;
