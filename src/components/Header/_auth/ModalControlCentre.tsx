'use client';

import ForgotPasswordModal from '@/components/Auth/ForgotPassword/ForgotPasswordModal';
import React from 'react';
import SignIn from '@/components/Auth/SignIn/SignIn';
import SignUp from '@/components/Auth/SignUp/SignUp';
import OverlaidModal from '@/components/common/OverlaidModal';
import { useSearchParams } from 'next/navigation';

const ModalControlCentre = () => {
  const searchParams = useSearchParams();
  const isSignInTrue = !!searchParams.get('sign-in');
  const isForgotPasswordTrue = !!searchParams.get('forgot-password');
  const isSignUpTrue = !!searchParams.get('sign-up');

  return (
    <>
      {isForgotPasswordTrue && <ForgotPasswordModal />}
      {isSignInTrue && (
        <OverlaidModal>
          <SignIn />
        </OverlaidModal>
      )}
      {isSignUpTrue && (
        <OverlaidModal>
          <SignUp />
        </OverlaidModal>
      )}
    </>
  );
};

export default ModalControlCentre;
