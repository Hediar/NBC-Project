import React from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import CommentInput from './CommentInput';
import DisplayComments from './DisplayComments';

interface Props {
  discussionId: string;
}

const DiscussionCommentContainer = async ({ discussionId }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: commentsData, error } = await supabase
    .from('discussion_comments')
    .select('*, discussion_comments_likes("user_id")')
    .eq('post_id', discussionId)
    .order('created_at');

  // signed user get; username, avatar_url
  const { data: currentUserId, error: currentUserIdError } = await supabase.auth.getUser();
  const signedInUserId = currentUserId.user?.id as string;

  const addedCommentsData: any =
    commentsData?.map((comment) => ({
      ...comment,
      user_has_liked_comment: !!comment.discussion_comments_likes.find((like) => like.user_id === signedInUserId),
      likes: comment.discussion_comments_likes.length
    })) ?? [];

  const { data: signedInUserData, error: err } = await supabase
    .from('users')
    .select('username, avatar_url')
    .eq('id', signedInUserId)
    .single();

  if (err) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex gap-2 items-center">
          <CommentInput signedInUserId={signedInUserId} discussionId={discussionId} />
        </div>

        <DisplayComments addedCommentsData={addedCommentsData} signedInUserId={signedInUserId} />
      </div>
    );
  }

  if (error) {
    // console.log(error);
    return <>에러가 발생했습니다.</>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex gap-2 items-center">
        <CommentInput signedInUserId={signedInUserId} discussionId={discussionId} />
      </div>

      <DisplayComments addedCommentsData={addedCommentsData} signedInUserId={signedInUserId} />
    </div>
  );
};

export default DiscussionCommentContainer;
