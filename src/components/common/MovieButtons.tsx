'use client';

import POSTWatchLater from '@/api/POSTWatchLater';
import getMovieNameWIthMovieId from '@/api/getMovieNameWIthMovieId';
import { HeartFilled, HeartOutlined, HeartTwoTone, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const MovieButtons = ({ movieId, title }: { movieId: number; title: string }) => {
  const router = useRouter();
  const path = usePathname();
  const [isHeartHover, setIsHeartHover] = useState<boolean>(false);
  const [isThumbsUpHover, setIsThumbsUpHover] = useState<boolean>(false);

  const ignoreHandler = async () => {
    const ignoreMovie = async () => {
      const data = await fetch('/movies/ignore-movie', { method: 'POST', body: JSON.stringify({ movieId, path }) });
      const { isError, message } = await data.json();

      if (isError && message.includes('no user')) {
        return router.replace(`?sign-in=true&scrollTo=${movieId}`);
      } else if (isError && message.includes('이미')) {
        return alert(message);
      } else if (isError) {
        return alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
      alert('무시 목록에 추가됐습니다. 추천 목록에서 제외됩니다.');
      // router.refresh();
    };
    ignoreMovie();
    //
  };

  const watchLaterClickHandler = async (movieId: number) => {
    const message = await POSTWatchLater(movieId);
    const movieTitle = await getMovieNameWIthMovieId([movieId.toString()]);

    alert(movieTitle[0] + message);
    router.refresh();
    return;
  };

  return (
    <>
      <div className="absolute -top-9 left-0">
        {!isThumbsUpHover && (
          <LikeOutlined
            onMouseEnter={() => setIsThumbsUpHover(true)}
            className="text-2xl text-slate-200 cursor-pointer"
          />
        )}
        {isThumbsUpHover && (
          <Tooltip title="좋아요" color="#8a8c8f">
            <LikeFilled
              className="text-2xl text-slate-200 cursor-pointer "
              onMouseLeave={() => setIsThumbsUpHover(false)}
            />
          </Tooltip>
        )}
      </div>
      <div className="absolute -top-9 -right-1">
        {!isHeartHover && (
          <HeartOutlined onMouseEnter={() => setIsHeartHover(true)} className="text-2xl text-red-400 cursor-pointer" />
        )}
        {isHeartHover && (
          <Tooltip title="이 영화 찜하기" color="#f46f6f">
            <HeartFilled
              className="text-2xl text-red-400 cursor-pointer "
              onMouseLeave={() => setIsHeartHover(false)}
              onClick={() => watchLaterClickHandler(movieId)}
            />
          </Tooltip>
        )}
      </div>
      <button
        onClick={() => router.push(process.env.NEXT_PUBLIC_BASE_URL + '/detail/' + movieId)}
        className="text-white text-center py-2 hover:bg-gray-900 rounded-lg hover:bg-opacity-60 bg-gray-900
  bg-opacity-20  w-full transform ease-in duration-100 hover:scale-105"
      >
        상세보기
      </button>
      <button
        onClick={() => {
          router.replace(`?rate-movie=true&title=${title}&id=${movieId}#${movieId}`);
        }}
        className="text-white text-center  py-2 hover:bg-gray-900 rounded-lg hover:bg-opacity-60 bg-gray-900
  bg-opacity-20  w-full transform ease-in duration-100 hover:scale-105"
      >
        이미 봤어요
      </button>
      <button
        className="text-white text-center  py-2 hover:bg-gray-900 rounded-lg hover:bg-opacity-60 bg-gray-900
bg-opacity-20  w-full transform ease-in duration-100 hover:scale-105"
        onClick={ignoreHandler}
      >
        무시하기
      </button>
    </>
  );
};

export default MovieButtons;
