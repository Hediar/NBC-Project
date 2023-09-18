'use client';

import { experimental_useOptimistic as useOptimistic } from 'react';
import CommentBox from './CommentBox';

interface Props {
  addedCommentsData: DiscussionCommentsData[];
  signedInUserId: string;
}

const DisplayComments = ({ addedCommentsData, signedInUserId }: Props) => {
  const [optimisticComments, addOptimisticComments] = useOptimistic<DiscussionCommentsData[], DiscussionCommentsData>(
    addedCommentsData,
    (currentOptimisticComments, newComment) => {
      const newOptimisticComments = [...currentOptimisticComments];
      const index = newOptimisticComments.findIndex((comment) => comment.id === newComment.id);
      newOptimisticComments[index] = newComment;
      return newOptimisticComments;
    }
  );

  const displayComments = optimisticComments?.map((comment) => {
    return (
      <CommentBox
        key={comment.id}
        signedInUserId={signedInUserId}
        comment={comment}
        addOptimisticComments={addOptimisticComments}
      />
    );
  });

  return <div>{displayComments}</div>;
};

export default DisplayComments;
