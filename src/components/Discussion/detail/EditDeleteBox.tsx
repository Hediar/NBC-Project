'use client';
import useDiscussionPostQuery from '@/hooks/useDiscussionPostQuery';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  postId: number;
};

const EditDeleteBox = ({ postId }: Props) => {
  const router = useRouter();
  const { deletePostMutation } = useDiscussionPostQuery(postId);

  const deletePost = async (check: boolean) => {
    if (!check) return;
    try {
      //FK 이용한 보다 성능좋은 기능 있을지?
      deletePostMutation.mutate(postId);

      router.push('/discussion/list/1');
    } catch (error) {
      //   console.log('에러==>>', error);
    }
  };
  return (
    <div>
      <div className="flex justify-end mr-5 gap-3">
        <Link href={`/discussion/edit/${postId}`}>게시글 수정</Link>
        <button
          onClick={() => {
            const check = confirm('삭제된 글은 복구할 수 없습니다.\n \n삭제하시겠습니까?');
            deletePost(check);
          }}
        >
          게시글 삭제
        </button>
      </div>
    </div>
  );
};

export default EditDeleteBox;
