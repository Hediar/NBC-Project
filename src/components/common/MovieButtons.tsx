'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const MovieButtons = ({ movieId, title }: { movieId: number; title: string }) => {
  const router = useRouter();
  const path = usePathname();

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

  return (
    <>
      <button
        onClick={() => router.push(process.env.NEXT_PUBLIC_BASE_URL + '/detail/' + movieId)}
        className="text-white text-center  py-2 hover:bg-gray-900 rounded-lg hover:bg-opacity-60 bg-gray-900
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
