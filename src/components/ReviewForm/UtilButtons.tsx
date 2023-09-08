'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { Edit, More } from '@/styles/icons/Icons24';
import supabase from '@/supabase/config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Dropdown, MenuProps, message } from 'antd';

type Props = {
  postId: string;
  userId: string;
  className?: string;
};

const UtilButtons = ({ postId, userId, className }: Props) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [mounted, setMounted] = useState<boolean>(false);
  const { userInfo } = useUserInfoStore();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  }

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

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link href={`/review/edit/${postId}`}>수정하기</Link>
      ),
    },
    {
      key: '2',
      label: (
        <button onClick={delButtonHandler}>삭제</button>
      ),
    }
  ];

  return (
    mounted && (
      <div className={className}>
        {contextHolder}
        {userId === userInfo.id ? (
          <Dropdown menu={{ items }} placement="bottomRight">
            <button onClick={handleClick}><span className='sr-only'>메뉴</span><More /></button>
          </Dropdown>
        ) : null}
      </div>
    )
  );
};

export default UtilButtons;
