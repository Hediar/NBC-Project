'use client';

import POSTWatchLater from '@/api/POSTWatchLater';
import useUserInfoStore from '@/store/saveCurrentUserData';
import supabase from '@/supabase/config';
import { BookmarkLinedGreen, BookmarkLinedWhite } from '@/styles/icons/Icons24';
import { throttle } from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

const WatchLaterButton = ({ movieId }: { movieId: string | number }) => {
  const { userInfo } = useUserInfoStore();
  const router = useRouter();
  const [isAlreadyAdded, setIsAlreadyAdded] = useState<boolean>(false);
  const [isOnHover, setIsOnHover] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const checkWatchLater = async (movieId: number | string) => {
    if (!userInfo.id) {
      setIsAlreadyAdded(false);
    } else {
      const { data: WatchLaterTable } = await supabase.from('watch_later').select('movies').eq('userid', userInfo.id);

      if (WatchLaterTable?.length) {
        const movies = WatchLaterTable[0].movies;
        movies.includes(movieId) ? setIsAlreadyAdded(true) : setIsAlreadyAdded(false);
      } else {
        setIsAlreadyAdded(false);
      }
    }
  };

  useEffect(() => {
    checkWatchLater(movieId.toString());
  }, [userInfo]);

  const watchLaterClickHandler = throttle(
    async (movieId: number) => {
      if (isAlreadyAdded) {
        setIsAlreadyAdded(false);
      } else {
        setIsAlreadyAdded(true);
      }

      if (!userInfo.id) {
        setIsAlreadyAdded(false);
        return messageApi.open({
          type: 'error',
          content: '로그인 해주세요!'
        });
      }
      await POSTWatchLater(movieId);

      router.refresh();
      return;
    },
    1000, // 스로틀링 간격 (여기서는 1000ms)
    { trailing: false } // 마지막 호출 후 추가 호출 방지
  );

  return (
    <>
      {contextHolder}
      {isAlreadyAdded ? (
        <BookmarkLinedGreen
          fill={isOnHover ? 'transparent' : '#0dca20'}
          className="w-7 h-7 sm:w-8 sm:h-8 watch-later cursor-pointer animate-200 hover:scale-110"
          onMouseOver={() => setIsOnHover(true)}
          onMouseLeave={() => setIsOnHover(false)}
          onClick={() => watchLaterClickHandler(Number(movieId))}
        />
      ) : (
        <BookmarkLinedWhite
          className="w-7 h-7 sm:w-8 sm:h-8 watch-later cursor-pointer animate-200 hover:scale-110"
          fill={isOnHover ? 'white' : 'transparent'}
          onMouseOver={() => setIsOnHover(true)}
          onMouseLeave={() => setIsOnHover(false)}
          onClick={() => watchLaterClickHandler(Number(movieId))}
        />
      )}
    </>
  );
};

export default WatchLaterButton;
