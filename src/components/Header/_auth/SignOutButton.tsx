'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { SVG_SignOut } from '@/styles/svg/SignOut';
import { Button, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignOutButton = () => {
  const router = useRouter();
  const { deleteUserInfo } = useUserInfoStore();
  const [messageApi, messageContent] = message.useMessage();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const clickHandler = async () => {
    setIsClicked(true);
    await axios.post('/auth/sign-out');
    messageApi.open({ content: '로그아웃 되었습니다.', type: 'success' });
    deleteUserInfo();
    setTimeout(() => {
      router.refresh();
      setIsClicked(false);
    }, 1500);
  };

  return (
    <>
      {messageContent}
      <div className="body1_regular_suit text-sm sm:text-base  flex items-center">
        <Button
          onClick={clickHandler}
          className="hidden lg:block hover:font-semibold animate-200"
          type="text"
          loading={isClicked}
        >
          로그아웃
        </Button>
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
