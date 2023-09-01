'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Props {
  signedInUserId: string;
  discussionId: string;
}

const CommentInput = ({ signedInUserId, discussionId }: Props) => {
  const [commentValue, setCommentValue] = useState<string>('');
  const router = useRouter();

  const writeCommentHandler = async () => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('discussion_comments')
      .insert({ content: commentValue, user_id: signedInUserId, post_id: Number(discussionId) });

    if (error) {
      console.log(error);
      return;
    }
    alert('등록되었습니다.');
    setCommentValue('');
    router.refresh();
  };

  return (
    <div className="flex w-full gap-2">
      <div className="w-5/6">
        <input
          name="comment"
          type="text"
          className="custom_input "
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
      </div>
      <div className="w-1/6">
        <button onClick={writeCommentHandler} className="custom_button">
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
