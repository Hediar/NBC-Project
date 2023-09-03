'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import OverlaidModal from './OverlaidModal';

const MovieButtons = ({ movieId, title }: { movieId: number; title: string }) => {
  const router = useRouter();

  const alreadyWatchedHandler = async () => {
    const data = await fetch('/movies/add-watch-later', { method: 'POST' });
    const res = await data.json();

    if (!data.ok) {
      alert('추가하는데 실패했습니다. 다시 시도해주세요.');
    } else {
      alert('추가 성공');
    }
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
      >
        무시하기
      </button>
    </>
  );
};

export default MovieButtons;
