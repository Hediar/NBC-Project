'use client';

import OverlaidModal from '@/components/common/OverlaidModal';
import { useSearchParams } from 'next/navigation';
import RateMovie from '@/components/common/RateMovie';
import EditDiscussionCommentModal from '@/components/Discussion/detail/comment/EditCommentInput';
import NewSignnIn from '@/components/Auth/SignIn/NewSignnIn';

const ModalControlCentre = ({ userId }: { userId: string }) => {
  const searchParams = useSearchParams();

  const isRateTrue = !!searchParams.get('rate-movie');
  const title = decodeURIComponent(searchParams.get('title') as string);
  const movieId = searchParams.get('id') as string;

  const isIgnoreMovieTrue = !!searchParams.get('ignore-movie');

  const isEditCommentTrue = !!searchParams.get('edit-comment');
  const editCommentPostId = searchParams.get('postid');

  const scrollTo = searchParams.get('scrollTo');

  return (
    <>
      {userId && isRateTrue ? (
        <OverlaidModal scrollTo={movieId}>
          <RateMovie title={title} movieId={movieId} />
        </OverlaidModal>
      ) : (
        <></>
      )}
      {!userId && isIgnoreMovieTrue && <NewSignnIn />}
      {isEditCommentTrue && (
        <OverlaidModal scrollTo={scrollTo!}>
          <EditDiscussionCommentModal postId={editCommentPostId!} />
        </OverlaidModal>
      )}
    </>
  );
};

export default ModalControlCentre;
