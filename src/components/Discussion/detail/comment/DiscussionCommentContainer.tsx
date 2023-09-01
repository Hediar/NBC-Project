import React from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { Database } from '@/types/supabase';
import changeFormat from '@/api/formatTime';
import PostButton from './CommentInput';
import CommentInput from './CommentInput';
import DeleteCommentButton from './DeleteComment';
import EditCommentButton from './EditComment';

interface Props {
  discussionId: string;
}

const DiscussionCommentContainer = async ({ discussionId }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: commentsData, error } = await supabase.from('discussion_comments').select().eq('post_id', discussionId);

  // signed user get; username, avatar_url
  const { data: currentUserId, error: err000 } = await supabase.auth.getUser();

  const signedInUserId = currentUserId.user?.id as string;

  const { data: signedInUserData, error: err } = await supabase
    .from('users')
    .select('username, avatar_url')
    .eq('id', signedInUserId)
    .single();

  if (err) {
    return <>에러 발생!</>;
  }

  const { username: currentUserUsername, avatar_url: currentUserAvatar_url } = signedInUserData;

  if (error) {
    console.log(error);
    return <>에러가 발생했습니다.</>;
  }

  // console.log(commentsData);

  const displayComments = commentsData.map((comment) => {
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
            <span>좋아요 1개</span>
            <button>답글</button>
            <span>{changeFormat(comment.created_at)}</span>
            <button className="text-xl">🩷</button>
            {signedInUserId === comment.user_id && <DeleteCommentButton postId={comment.id} />}
            {signedInUserId === comment.user_id && <EditCommentButton postId={comment.id} />}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="w-1/2 m-8 flex flex-col gap-4">
      <div className="w-full flex gap-2 items-center">
        <Image
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
          alt="user-profile"
          src={currentUserAvatar_url!}
        />
        <CommentInput signedInUserId={signedInUserId} discussionId={discussionId} />
      </div>

      <div className="">{displayComments}</div>
    </div>
  );
};

export default DiscussionCommentContainer;
