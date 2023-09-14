'use client';

import POSTWatchLater from '@/api/POSTWatchLater';
import getMovieNameWIthMovieId from '@/api/getMovieNameWIthMovieId';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { BookmarkLinedGreen, BookmarkLinedWhite } from '@/styles/icons/Icons24';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const WatchLaterButton = ({ movieId }: { movieId: string | number }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { userInfo } = useUserInfoStore();
  const router = useRouter();
  const [isAlreadyAdded, setIsAlreadyAdded] = useState<boolean>(false);
  const [isOnHover, setIsOnHover] = useState<boolean>(false);

  const watchLaterClickHandler = async (movieId: number) => {
    if (isAlreadyAdded) {
      setIsAlreadyAdded(false);
    } else {
      setIsAlreadyAdded(true);
    }

    if (!userInfo.id) {
      router.replace('?sign-in=true');
      return;
    }
    await POSTWatchLater(movieId);

    router.refresh();
    return;
  };

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
