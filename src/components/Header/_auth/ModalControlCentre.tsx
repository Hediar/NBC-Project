'use client';

import ForgotPasswordModal from '@/components/Auth/ForgotPassword/ForgotPasswordModal';
import React from 'react';
import SignIn from '@/components/Auth/SignIn/SignIn';
import SignUp from '@/components/Auth/SignUp/SignUp';
import OverlaidModal from '@/components/common/OverlaidModal';
import { useSearchParams } from 'next/navigation';
import RateMovie from '@/components/common/RateMovie';

const ModalControlCentre = ({ signedInUserId }: { signedInUserId: string }) => {
  const searchParams = useSearchParams();
  const isSignInTrue = !!searchParams.get('sign-in');
  const isForgotPasswordTrue = !!searchParams.get('forgot-password');
  const isSignUpTrue = !!searchParams.get('sign-up');

  const isRateTrue = !!searchParams.get('rate-movie');
  const title = decodeURIComponent(searchParams.get('title') as string);
  const movieId = searchParams.get('id') as string;

  const isIgnoreMovieTrue = !!searchParams.get('ignore-movie');

  const scrollTo = searchParams.get('scrollTo');

  return (
    <>
      {isForgotPasswordTrue && <ForgotPasswordModal />}
      {isSignInTrue && (
        <OverlaidModal scrollTo={scrollTo ?? ''}>
          <SignIn />
        </OverlaidModal>
      )}
      {isSignUpTrue && (
        <OverlaidModal>
          <SignUp />
        </OverlaidModal>
      )}
      {/* 유저가 로그인이 되어있으면 보여주고 아니면 로그인 화면 보여주기 */}
      {signedInUserId && isRateTrue ? (
        <OverlaidModal scrollTo={movieId}>
          <RateMovie title={title} movieId={movieId} />
        </OverlaidModal>
      ) : (
        <></>
      )}
      {!signedInUserId && isIgnoreMovieTrue && (
        <OverlaidModal>
          <SignIn />
        </OverlaidModal>
      )}
    </>
  );
};

export default ModalControlCentre;
