'use client';

import useToggleSignInModal from '@/store/toggleSignInModal';
import { Button } from 'antd';

const SignInButton = () => {
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();

  return (
    <>
      <Button
        type="text"
        loading={isSignInModalOpen}
        onClick={() => {
          setIsSignInModalOpen(true);
        }}
        className="text-sm sm:text-base pt-[2px] hover:font-semibold animate-200"
      >
        로그인
      </Button>
    </>
  );
};

export default SignInButton;
