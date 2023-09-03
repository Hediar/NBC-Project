'use client';

import ForgotPasswordModal from '@/components/Auth/ForgotPassword/ForgotPasswordModal';
import React from 'react';
import SignIn from '@/components/Auth/SignIn/SignIn';
import SignUp from '@/components/Auth/SignUp/SignUp';
import OverlaidModal from '@/components/common/OverlaidModal';
import { useSearchParams } from 'next/navigation';
import RateMovie from '@/components/common/RateMovie';

const ModalControlCentre = () => {
  const searchParams = useSearchParams();
  const isSignInTrue = !!searchParams.get('sign-in');
  const isForgotPasswordTrue = !!searchParams.get('forgot-password');
  const isSignUpTrue = !!searchParams.get('sign-up');

  const isRateTrue = !!searchParams.get('rate-movie');
  const title = decodeURIComponent(searchParams.get('title') as string);
  const movieId = searchParams.get('id') as string;

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
      {isRateTrue && (
        <OverlaidModal scrollTo={movieId}>
          <RateMovie title={title} movieId={movieId} />
        </OverlaidModal>
      )}
    </>
  );
};

export default ModalControlCentre;
