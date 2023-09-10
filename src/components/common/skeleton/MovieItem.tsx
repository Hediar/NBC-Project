'use client';

import { Skeleton } from 'antd';
import React from 'react';

const SkeletonMovieItem = () => {
  return (
    <div className="w-[140px] sm:w-[240px] flex flex-col gap-3">
      <Skeleton.Image style={{ width: '240px', height: '210px' }} active></Skeleton.Image>
      <Skeleton style={{ width: '240px' }} active></Skeleton>
    </div>
  );
};

export default SkeletonMovieItem;
