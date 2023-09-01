'use client';

import useToggleDiscussionCommentEditModal from '@/store/toggleDiscussionCommentEditModal';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  postId: string;
}

const EditCommentButton = ({ postId }: Props) => {
  const router = useRouter();
  const { isDiscussionCommentEditModalOpen, setIsDiscussionCommentEditModalOpen } =
    useToggleDiscussionCommentEditModal();

  const deleteHandler = async () => {
    if (confirm('수정하시겠습니까?')) {
      setIsDiscussionCommentEditModalOpen(true, postId);
    }
  };

  return (
    <>
      <button onClick={deleteHandler}>수정</button>
    </>
  );
};

export default EditCommentButton;
