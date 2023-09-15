'use client';

import OverlaidModal from '@/components/common/OverlaidModal';
import { useRouter, useSearchParams } from 'next/navigation';
import RateMovie from '@/components/common/RateMovie';
import EditDiscussionCommentModal from '@/components/Discussion/detail/comment/EditCommentInput';
import SignIn from '@/components/Auth/SignIn/SignIn';
import { Modal } from 'antd';
import useToggleSignInModal from '@/store/toggleSignInModal';
import { useEffect } from 'react';
import useSaveCurrentURL from '@/hooks/saveCurrentURL';

const ModalControlCentre = ({ userId }: { userId: string }) => {
  const searchParams = useSearchParams();
  const url = useSaveCurrentURL();

  const isSignInOpen = !!searchParams.get('sign-in');
  const router = useRouter();

  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();
  const isRateTrue = !!searchParams.get('rate-movie');
  const title = decodeURIComponent(searchParams.get('title') as string);
  const movieId = searchParams.get('id') as string;

  const isIgnoreMovieTrue = !!searchParams.get('ignore-movie');

  const isEditCommentTrue = !!searchParams.get('edit-comment');
  const editCommentPostId = searchParams.get('postid');

  const scrollTo = searchParams.get('scrollTo');

  useEffect(() => {
    if (isSignInOpen) {
      setIsSignInModalOpen(true);
    }
  }, [isSignInOpen]);

  return (
    <>
      {userId && isRateTrue ? (
        <OverlaidModal scrollTo={movieId}>
          <RateMovie title={title} movieId={movieId} />
        </OverlaidModal>
      ) : (
        <></>
      )}
      {!userId && isIgnoreMovieTrue && <SignIn />}
      {isEditCommentTrue && (
        <OverlaidModal scrollTo={scrollTo!}>
          <EditDiscussionCommentModal postId={editCommentPostId!} />
        </OverlaidModal>
      )}
      <Modal
        centered
        open={isSignInModalOpen}
        footer={null}
        onCancel={() => {
          setIsSignInModalOpen(false);
        }}
        afterClose={() => router.replace(url)}
      >
        <SignIn />
      </Modal>
    </>
  );
};

export default ModalControlCentre;
