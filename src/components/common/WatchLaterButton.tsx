'use client';
import POSTWatchLater from '@/api/POSTWatchLater';
import getMovieNameWIthMovieId from '@/api/getMovieNameWIthMovieId';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { BookmarkLinedWhite } from '@/styles/icons/Icons24';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const WatchLaterButton = ({ movieId }: { movieId: string | number }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { userInfo } = useUserInfoStore();
  const router = useRouter();

  const watchLaterClickHandler = async (movieId: number) => {
    if (!userInfo.id) {
      router.replace('?sign-in=true');
      return;
    }
    const message = await POSTWatchLater(movieId);
    const movieTitle = await getMovieNameWIthMovieId([movieId.toString()]);
    messageApi.open({
      type: 'success',
      content: movieTitle[0] + message
    });

    router.refresh();
    return;
  };

  return (
    <>
      {contextHolder}
      <BookmarkLinedWhite
        className="peer/bookmark hover:hidden cursor-pointer"
        onClick={() => watchLaterClickHandler(Number(movieId))}
      />
      <BookmarkLinedWhite
        fill="white"
        className="hidden peer-hover/bookmark:block cursor-pointer"
        onClick={() => watchLaterClickHandler(Number(movieId))}
      />
    </>
  );
};

export default WatchLaterButton;
