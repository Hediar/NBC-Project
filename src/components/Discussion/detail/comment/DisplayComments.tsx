'use client';

import changeFormat from '@/api/formatTime';
import Image from 'next/image';
import React from 'react';
import LikeButton from './LikeButton';
import DeleteCommentButton from './DeleteComment';
import EditCommentButton from './EditComment';
import { experimental_useOptimistic as useOptimistic } from 'react';

interface Props {
  addedCommentsData: {
    content: string;
    created_at: string;
    id: string;
    post_id: number;
    profiles: {
      username: string;
      avatar_url: string;
    };
    user_id: string;
    discussion_comments_likes: {
      comments_id: string;
      created_at: string;
      id: number;
      user_id: string;
    };
    user_has_liked_comment: boolean;
    likes: number;
  }[];
  signedInUserId: string;
}

const DisplayComments = ({ addedCommentsData, signedInUserId }: any) => {
  const [optimisticComments, addOptimisticComments] = useOptimistic<any, any>(
    addedCommentsData,
    (currentOptimisticComments, newComment) => {
      const newOptimisticComments = [...currentOptimisticComments];
      const index = newOptimisticComments.findIndex((comment) => comment.id === newComment.id);
      newOptimisticComments[index] = newComment;
      return newOptimisticComments;
    }
  );

  const displayComments = optimisticComments.map((comment: any) => {
    return (
      <div key={comment.id} className="flex w-full text-sm mb-2">
        <div className="w-1/12">
          <Image
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
            alt="user-profile"
            src={comment.profiles!.avatar_url}
          />
        </div>
        <div className="w-11/12 flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <h6 className="font-semibold ">{comment.profiles!.username}</h6>
            <p className="text-base">{comment.content}</p>
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
