/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: '존재하지 않는 페이지입니다.',
  description: '입력하신 주소가 정확한지 다시 한 번 확인해 주세요.'
};

const NotFound = () => {
  return (
    <main className="bg-white flex flex-col gap-2 items-center justify-center h-[calc(100vh-370px)]">
      <img className="w-[300px]" src="/not-found.png" alt="not-found" />
      <h1 className="text-2xl">죄송합니다 요청하신 페이지를 찾을 수 없습니다</h1>
      <h2 className="text-md text-gray-600">입력하신 주소가 정확한지 다시 한 번 확인해 주세요</h2>
      <Link
        className="py-2 px-4 shadow-sm shadow-gray-400 rounded-md bg-slate-500 text-white hover:bg-slate-600"
        href={'/'}
      >
        메인페이지로 돌아가기
      </Link>
    </main>
  );
};

export default NotFound;
