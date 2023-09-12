'use client';

import POSTWatchLater from '@/api/POSTWatchLater';
import getMovieNameWIthMovieId from '@/api/getMovieNameWIthMovieId';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { BookmarkLinedWhite } from '@/styles/icons/Icons24';
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
    if (!userInfo.id) {
      router.replace('?sign-in=true');
      return;
    }
    const message = await POSTWatchLater(movieId);
    const movieTitle = await getMovieNameWIthMovieId([movieId.toString()]);

    if (message!.includes('제외했습니다')) {
      messageApi.open({
        type: 'success',
        content: movieTitle[0] + message
      });
      setIsAlreadyAdded(false);
    }

    if (message!.includes('추가했습니다')) {
      messageApi.open({
        type: 'success',
        content: movieTitle[0] + message
      });
      setIsAlreadyAdded(true);
    }

    router.refresh();
    return;
  };

  useEffect(() => {
    checkWatchLater(Number(movieId));
  }, []);

  const supabase = createClientComponentClient<Database>();

  const checkWatchLater = async (movieId: number) => {
    if (!userInfo.id) {
      return;
    }
    const { data: watchLaterMovies, error } = await supabase
      .from('watch_later')
      .select('movies')
      .eq('userid', userInfo.id)
      .single();

    if (error) {
      return;
    }

    if (watchLaterMovies.movies.some((movie) => movie === movieId.toString())) {
      setIsAlreadyAdded(true);
    }
  };

  return (
    <>
      {contextHolder}
      {isAlreadyAdded ? (
        <BookmarkLinedWhite
          fill={isOnHover ? 'transparent' : 'white'}
          className="watch-later cursor-pointer animate-200 hover:scale-110"
          onMouseOver={() => setIsOnHover(true)}
          onMouseLeave={() => setIsOnHover(false)}
          onClick={() => watchLaterClickHandler(Number(movieId))}
        />
      ) : (
        <BookmarkLinedWhite
          className="watch-later cursor-pointer animate-200 hover:scale-110"
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
