/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import toggleIsPublicData from '@/api/supabase/toggleIsPublicData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Switch, message } from 'antd';
import React, { useEffect, useState } from 'react';

type Props = {
  title: '찜 목록' | '좋아요 목록' | '나의 리뷰' | '나의 토론';
  columnName: 'watch_later' | 'movielikes' | 'reviews' | 'discussion_post';
  isPublic: boolean;
  userId: string;
};

const ToggleIsPublic = ({ title, columnName, isPublic, userId }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [toggleValue, setToggleValue] = useState<boolean>(isPublic);
  const [count, setCount] = useState<number>(0);

  const [isErrorCount, setIsErrorCount] = useState<number>(0);
  const [isSuccessCount, setIsSuccessCount] = useState<number>(0);

  const OnChangeHandler = () => {
    setToggleValue(!toggleValue);
    setCount(count + 1);
  };

  useEffect(() => {
    if (count === 0) return;
    const initiateAsyncFunction = async () => {
      const supabase = createClientComponentClient();
      const { isError, isSuccess } = await toggleIsPublicData(supabase, userId, columnName, toggleValue);

      if (isError) {
        setIsErrorCount(isErrorCount + 1);
      }

      if (isSuccess) {
        setIsSuccessCount(isSuccessCount + 1);
      }
    };
    initiateAsyncFunction();
  }, [count]);

  useEffect(() => {
    if (isErrorCount === 0) return;
    messageApi.open({
      type: 'error',
      content: '에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
    });
  }, [isErrorCount]);

  useEffect(() => {
    if (isSuccessCount === 0) return;
    messageApi.open({
      type: 'success',
      content: '변경되었습니다.'
    });
  }, [isSuccessCount]);

  return (
    <>
      {contextHolder}
      <div className="w-64 h-12 px-3 py-2 bg-neutral-50 rounded-xl border border-gray-200 justify-between items-center gap-5 inline-flex">
        <p className="text-neutral-800 text-sm">{title}</p>
        <Switch checked={toggleValue} onChange={OnChangeHandler} />
      </div>
    </>
  );
};

export default ToggleIsPublic;
