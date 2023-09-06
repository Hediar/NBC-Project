'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { Edit } from '@/styles/icons/Icons24';
import supabase from '@/supabase/config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

type Props = {
  postId: string;
  userId: string;
};

const UtilButtons = ({ postId, userId }: Props) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [mounted, setMounted] = useState<boolean>(false);
  const { userInfo } = useUserInfoStore();

  const delButtonHandler = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const { data, error } = await supabase.from('reviews').delete().eq('reviewid', postId);
      if (error)
        return messageApi.open({
          type: 'warning',
          content: '오류가 발생했습니다.' + error.message
        });

      messageApi.open({
        type: 'success',
        content: '삭제되었습니다.'
      });
      router.push('/');
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        {contextHolder}
        {userId === userInfo.id ? (
          <div className="flex items-center gap-5">
            {/* <button onClick={editButtonHandler}>수정</button> */}
            <Link href={`/review/edit/${postId}`} className="ml-auto">
              <Edit />
            </Link>

            <button onClick={delButtonHandler}>삭제</button>
          </div>
        ) : null}
      </>
    )
  );
};

export default UtilButtons;
