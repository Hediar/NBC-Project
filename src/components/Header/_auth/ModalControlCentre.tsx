'use client';

import ForgotPasswordModal from '@/components/Auth/ForgotPassword/ForgotPasswordModal';
import React from 'react';
import SignIn from '@/components/Auth/SignIn/SignIn';
import SignUp from '@/components/Auth/SignUp/SignUp';
import OverlaidModal from '@/components/common/OverlaidModal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import RateMovie from '@/components/common/RateMovie';
import EditDiscussionCommentModal from '@/components/Discussion/detail/comment/EditCommentInput';
import NewSignnIn from '@/components/Auth/SignIn/NewSignnIn';
import NewSignUp from '@/components/Auth/SignUp/NewSignUp';

const ModalControlCentre = ({ signedInUserId }: { signedInUserId: string }) => {
  const searchParams = useSearchParams();
  const isSignInTrue = !!searchParams.get('sign-in');

  const isForgotPasswordTrue = !!searchParams.get('forgot-password');
  const isSignUpTrue = !!searchParams.get('sign-up');

  const isRateTrue = !!searchParams.get('rate-movie');
  const title = decodeURIComponent(searchParams.get('title') as string);
  const movieId = searchParams.get('id') as string;

  const isIgnoreMovieTrue = !!searchParams.get('ignore-movie');

  const isEditCommentTrue = !!searchParams.get('edit-comment');
  const editCommentPostId = searchParams.get('postid');

  const scrollTo = searchParams.get('scrollTo');

  return (
    <>
      {isForgotPasswordTrue && <ForgotPasswordModal />}
      {/* {isSignInTrue && (
        <OverlaidModal scrollTo={scrollTo ?? ''}>
          <SignIn />
        </OverlaidModal>
      )} */}
      {isSignInTrue && <NewSignnIn />}
      {/* {isSignUpTrue && (
        <OverlaidModal>
          <SignUp />
        </OverlaidModal>
      )} */}
      {isSignUpTrue && <NewSignUp />}
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

      {isEditCommentTrue && (
        <OverlaidModal scrollTo={scrollTo!}>
          <EditDiscussionCommentModal postId={editCommentPostId!} />
        </OverlaidModal>
      )}
    </>
  );
};

export default ModalControlCentre;
