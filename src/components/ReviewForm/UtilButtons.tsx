'use client';
import useUserInfoStore from '@/app/(store)/saveCurrentUserData';
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
    const { error } = await supabase.from('reviews').delete().eq('id', userId);
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
