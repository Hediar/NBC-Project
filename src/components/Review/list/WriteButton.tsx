'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WriteButton = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    userInfo: { id: userId }
  } = useUserInfoStore();

  const handleClick = () => {
    if (!userId)
      return messageApi.open({
        type: 'warning',
        content: '로그인 해주세요'
      });

    router.push('/review/write');
  };

  useEffect(() => {
    if (userId) router.prefetch('/review/write');
  }, [userId]);

  return (
    <>
      {contextHolder}
      <button
        type="button"
        onClick={handleClick}
        className="button-dark md:ml-2 inline-flex items-center justify-center"
      >
        리뷰 작성
      </button>
    </>
  );
};

export default WriteButton;
