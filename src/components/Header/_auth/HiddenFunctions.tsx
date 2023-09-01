// forgot password 모달을 이 컴포넌트에 넣고 on off함.
// 이 컴포넌트는 헤드에 리턴값 없이 삽입되어 기능만 on
'use client';

import ForgotPasswordModal from '@/components/Auth/ForgotPassword/ForgotPasswordModal';
import useToggleForgotPassword from '@/store/toggleForgotPassword';
import React from 'react';
import SignIn from '@/components/Auth/SignIn/SignIn';
import SignUp from '@/components/Auth/SignUp/SignUp';
import useToggleSignInModal from '@/store/toggleSignInModal';
import useToggleSignUpModal from '@/store/toggleSignUpModal';
import OverlaidModal from '@/components/common/OverlaidModal';

const HiddenFunctions = () => {
  const { isForgotPasswordOpen, setIsForgotPasswordOpen } = useToggleForgotPassword();
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();
  const { isSignUpModalOpen, setIsSignUpModalOpen } = useToggleSignUpModal();

  return (
    <>
      {isForgotPasswordOpen && <ForgotPasswordModal />}
      {isSignInModalOpen && (
        <OverlaidModal
          toggle={setIsSignInModalOpen}
          value={isSignInModalOpen}
          optional_toggle={setIsForgotPasswordOpen}
          optional_value={isForgotPasswordOpen}
        >
          <SignIn />
        </OverlaidModal>
      )}
      {isSignUpModalOpen && (
        <OverlaidModal toggle={setIsSignUpModalOpen} value={isSignUpModalOpen}>
          <SignUp />
        </OverlaidModal>
      )}
    </>
  );
};

export default HiddenFunctions;
