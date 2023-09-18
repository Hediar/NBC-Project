'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  postId: string;
}

const DeleteCommentButton = ({ postId }: Props) => {
  const [messageApi, context] = message.useMessage();
  const router = useRouter();
  const deleteHandler = async () => {
    if (confirm('삭제하시겠습니까?')) {
      const supabase = createClientComponentClient();
      const { error } = await supabase.from('discussion_comments').delete().eq('id', postId);
      if (error) {
        return messageApi.open({ type: 'error', content: '에러가 발생했습니다. 다시 시도해주세요.' });
      } else {
        messageApi.open({ type: 'success', content: '삭제 완료' });
        return router.refresh();
      }
    }
  };
  return (
    <>
      {context}
      <button onClick={deleteHandler}>삭제</button>
    </>
  );
};

export default DeleteCommentButton;
