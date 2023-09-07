'use client';

import changeFormat from '@/api/formatTime';
import Image from 'next/image';
import React from 'react';
import LikeButton from './LikeButton';
import DeleteCommentButton from './DeleteComment';
import EditCommentButton from './EditComment';
import { experimental_useOptimistic as useOptimistic } from 'react';

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
      <div
        key={comment.id}
        className="flex flex-col gap-3 w-full min-h-[142px] text-sm mb-2 p-5 border rounded-[20px] bg-[#EBEBEB]"
      >
        <div className="w-full flex items-center gap-3">
          <div>
            <Image
              className="h-8 w-8 rounded-full"
              width={40}
              height={40}
              alt="user-profile"
              src={comment.profiles!.avatar_url}
            />
          </div>
          <h6 className="subtitle2_suit">{comment.profiles!.username}</h6>
        </div>

        <div className="w-11/12 flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <p className="body1_regular_suit">{comment.content}</p>
          </div>
          <div className="flex gap-2 items-center">
            <span>좋아요 {comment.likes}개</span>
            <button>답글</button>
            <span>{changeFormat(comment.created_at)}</span>
            <LikeButton comment={comment} addOptimisticComments={addOptimisticComments} />
            {signedInUserId === comment.user_id && <DeleteCommentButton postId={comment.id} />}
            {signedInUserId === comment.user_id && <EditCommentButton postId={comment.id} />}
          </div>
        </div>
      </div>
    );
  });

  return <div>{displayComments}</div>;
};

export default DisplayComments;
