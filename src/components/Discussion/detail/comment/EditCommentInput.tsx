'use client';

import useToggleDiscussionCommentEditModal from '@/store/toggleDiscussionCommentEditModal';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

const EditDiscussionCommentModal = ({ postId }: { postId: string }) => {
  const inputValueRef = useRef<string>('');
  const router = useRouter();
  const { setIsDiscussionCommentEditModalOpen } = useToggleDiscussionCommentEditModal();

  const editHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValueRef.current === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from('discussion_comments')
      .update({ content: inputValueRef.current })
      .eq('id', postId);
    if (error) {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
    } else {
      alert('수정되었습니다.');
      router.refresh();
      setIsDiscussionCommentEditModalOpen(false, '');
    }
  };

  return (
    <form className="flex flex-col gap-3 bg-slate-100 p-8 rounded-lg shadow-md shadow-gray-400" onSubmit={editHandler}>
      <p className="text-center bg-slate-50 bg-opacity-50 py-1 px-2 rounded-lg">내용을 입력해주세요.</p>
      <input type="text" className="custom_input" onChange={(e) => (inputValueRef.current = e.target.value)} />
      <button className="custom_button">수정하기</button>
    </form>
  );
};

export default EditDiscussionCommentModal;
