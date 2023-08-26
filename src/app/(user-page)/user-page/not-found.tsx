import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: '존재하지 않는 페이지입니다.',
  description: '해당 유저네임을 갖은 유저가 존재하지 않습니다.'
};

const NotFound = () => {
  return (
    <>
      <main className="h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4 bg-slate-100">
        <h1 className="text-2xl">유저가 존재하지 않습니다!</h1>
        <h2 className="text-md text-gray-600">해당 유저이름을 갖은 유저가 없습니다.</h2>
        <Link
          className="py-2 px-4 shadow-sm shadow-gray-400 rounded-md bg-slate-500 text-white hover:bg-slate-600"
          href={'/'}
        >
          메인페이지로 돌아가기
        </Link>
      </main>
    </>
  );
};

export default NotFound;
