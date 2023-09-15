'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  postId: string;
}

const DeleteCommentButton = ({ postId }: Props) => {
  const router = useRouter();
  const deleteHandler = async () => {
    if (confirm('삭제하시겠습니까?')) {
      const supabase = createClientComponentClient();
      const { error } = await supabase.from('discussion_comments').delete().eq('id', postId);
      if (error) {
        // console.log(error);
        alert('에러가 발생했습니다. 다시 시도해주세요.');
      } else {
        alert('삭제 완료');
        router.refresh();
      }
    }
  };
  return <button onClick={deleteHandler}>삭제</button>;
};

export default DeleteCommentButton;
