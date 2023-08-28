'use client';
import useUserInfoStore from '@/store/saveCurrentUserData';
import supabase from '@/supabase/config';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  postId: string;
  userId: string;
};

const UtilButtons = ({ postId, userId }: Props) => {
  const router = useRouter();

  const { userInfo } = useUserInfoStore();

  const editButtonHandler = () => {
    router.push(`/review/edit/${postId}`);
  };
  const delButtonHandler = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const { data, error } = await supabase.from('reviews').delete().eq('reviewid', postId);
      if (error) return alert('오류가 발생했습니다.');

      alert('삭제되었습니다.');
      router.push('/');
    }
  };

  return (
    <>
      {userId === userInfo.id ? (
        <div>
          <button onClick={editButtonHandler}>수정</button>
          <button onClick={delButtonHandler}>삭제</button>
        </div>
      ) : null}
    </>
  );
};

export default UtilButtons;
