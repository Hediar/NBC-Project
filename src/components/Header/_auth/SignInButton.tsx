'use client';

import useToggleSignInModal from '@/store/toggleSignInModal';
import useToggleSignUpModal from '@/store/toggleSignUpModal';

const SignInButton = () => {
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();
  const { isSignUpModalOpen, setIsSignUpModalOpen } = useToggleSignUpModal();

  const clickHandler = () => {
    if (isSignUpModalOpen) {
      setIsSignUpModalOpen(isSignUpModalOpen);
    }
    setIsSignInModalOpen(isSignInModalOpen);
  };

  return (
    <>
      <button
        onClick={clickHandler}
        className="h-full py-2 px-3 rounded-md shadow-sm shadow-gray-700 bg-slate-700 text-white active:bg-slate-600 text-sm flex items-center"
      >
        로그인
      </button>
    </>
  );
};

export default SignInButton;
