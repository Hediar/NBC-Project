'use client';
import useDiscussionPostQuery from '@/hooks/useDiscussionPostQuery';
import useUserInfoStore from '@/store/saveCurrentUserData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

type Props = {
  postId: number;
  authorId: string;
};

const EditDeleteBox = ({ postId, authorId }: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const { deletePostMutation } = useDiscussionPostQuery('EditDeleteBox');
  const {
    userInfo: { id: userId }
  } = useUserInfoStore();

  const deletePost = async (check: boolean) => {
    if (!check) return;
    try {
      deletePostMutation.mutate(postId);

      messageApi.open({ type: 'success', content: '삭제되었습니다' });
      router.push('/discussion/list/1');
    } catch (error) {
      //   console.log('에러==>>', error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        {contextHolder}
        <div>
          {authorId === userId && (
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
          )}
        </div>
      </>
    )
  );
};

export default EditDeleteBox;
