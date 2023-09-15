'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  postId: string;
}

const EditCommentButton = ({ postId }: Props) => {
  const router = useRouter();

  const deleteHandler = async () => {
    router.replace(`?edit-comment=true&postid=${postId}&scrollTo="comment-edit"`);
  };

  return (
    <>
      <button id="comment-edit" onClick={deleteHandler}>
        수정
      </button>
    </>
  );
};

export default EditCommentButton;
