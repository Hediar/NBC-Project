'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { Skeleton } from 'antd';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import Image from 'next/image';
import React from 'react';

interface Props {
  params: string;
}

const UserPageSemiHeader = ({ params: username }: Props) => {
  const { userInfo } = useUserInfoStore();

  return (
    <>
      {userInfo.avatar_url ? (
        <div className="mt-[50px] w-full bg-[#f0743f] bg-opacity-90 h-[100px] xl:h-[70px] rounded-xl p-5 animate-300">
          <div className="h-full flex gap-7 items-center ml-5">
            <Image
              width={40}
              height={40}
              className="rounded-full w-12 h-12 sm:w-16 sm:h-16 xl:w-10 xl:h-10"
              src={userInfo.avatar_url}
              alt="user profile"
            />
            <span className="text-lg sm:text-2xl xl:text-xl text-white font-bold text-center">{username}</span>
          </div>
        </div>
      ) : (
        <div className="semi-header-loading mt-[50px] w-full bg-[#ebbeab] bg-opacity-90 h-[100px] xl:h-[70px] rounded-xl p-5 animate-300">
          <div className="h-full flex gap-7 items-center ml-5">
            <SkeletonAvatar size={'large'} active />
            <Skeleton.Input className="text-lg sm:text-2xl xl:text-xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default UserPageSemiHeader;
