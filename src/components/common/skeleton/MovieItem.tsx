'use client';

import { Skeleton } from 'antd';
import React from 'react';

const SkeletonMovieItem = () => {
  return (
    <div className="w-[140px] sm:w-[240px] flex flex-col gap-3">
      <div className="relative">
        <Skeleton.Image active className="w-[140px] h-[210px] sm:w-[240px] sm:h-[360px] rounded-xl" />
        <div className="bg-gray-800 bg-opacity-30 rounded-xl py-1 px-1 absolute top-4 right-4 flex flex-col gap-[6px] items-center">
          <Skeleton.Button active />
          <Skeleton.Button active />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton active />
        <div className="flex gap-1 items-center">
          <Skeleton active />
        </div>
        <div className="flex gap-[6px] items-center">
          <Skeleton active />
          <Skeleton active />
        </div>
      </div>
    </div>
  );
};

export default SkeletonMovieItem;
