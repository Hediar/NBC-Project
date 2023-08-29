'use client';

import SignUp from '@/components/Auth/SignUp/SignUp';
import Modal from '@/components/common/Modal';
import useToggleSignInModal from '@/store/toggleSignInModal';
import useToggleSignUpModal from '@/store/toggleSignUpModal';

const SignUpButton = () => {
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();
  const { isSignUpModalOpen, setIsSignUpModalOpen } = useToggleSignUpModal();

  const clickHandler = () => {
    console.log(isSignInModalOpen);
    if (isSignInModalOpen) {
      setIsSignInModalOpen(isSignInModalOpen);
    }
    setIsSignUpModalOpen(isSignUpModalOpen);
  };

  return (
    <>
      <button
        onClick={clickHandler}
        className="h-full py-2 px-3 rounded-md shadow-sm shadow-gray-700 bg-slate-700 text-white active:bg-slate-600 text-sm flex items-center"
      >
        {isSignUpModalOpen ? '닫기' : '회원가입'}
      </button>
      {isSignUpModalOpen && (
        <Modal>
          <SignUp />
        </Modal>
      )}
    </>
  );
};

export default SignUpButton;
