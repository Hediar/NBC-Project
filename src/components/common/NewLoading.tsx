import LoadingFriends from '@/styles/svg/LoadingFriends';
import React from 'react';

const NewLoading = () => (
  <main className="w-full h-[calc(100vh-370px)] flex justify-center items-center flex-col gap-1">
    <LoadingFriends className="hidden sm:block" />
    <LoadingFriends width={200} height={100} className="sm:hidden" />
    <h1 className="text-base text-neutral-800 sm:text-[32px] font-bold sm:mb-5">잠시만 기다려 주세요.</h1>
    <p className="text-sm text-neutral-800 sm:text-xl font-normal">해당 페이지로 이동 중입니다</p>
  </main>
);

export default NewLoading;
