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
import useToggleDiscussionCommentEditModal from '@/store/toggleDiscussionCommentEditModal';
import EditDiscussionCommentModal from '@/components/Discussion/detail/comment/EditCommentInput';

const ModalControlCentre = () => {
  const { isForgotPasswordOpen, setIsForgotPasswordOpen } = useToggleForgotPassword();
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();
  const { isSignUpModalOpen, setIsSignUpModalOpen } = useToggleSignUpModal();
  const { isDiscussionCommentEditModalOpen, postId, setIsDiscussionCommentEditModalOpen } =
    useToggleDiscussionCommentEditModal();

  return (
    <>
      {isForgotPasswordOpen && <ForgotPasswordModal />}
      {isSignInModalOpen && (
        <OverlaidModal toggle={setIsSignInModalOpen} optional_toggle={setIsForgotPasswordOpen}>
          <SignIn />
        </OverlaidModal>
      )}
      {isSignUpModalOpen && (
        <OverlaidModal toggle={setIsSignUpModalOpen}>
          <SignUp />
        </OverlaidModal>
      )}
      {isDiscussionCommentEditModalOpen && (
        <OverlaidModal toggle={setIsDiscussionCommentEditModalOpen}>
          <EditDiscussionCommentModal postId={postId!} />
        </OverlaidModal>
      )}
    </>
  );
};

export default ModalControlCentre;
