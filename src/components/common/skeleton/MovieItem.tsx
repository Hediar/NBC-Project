'use client';

import { Skeleton } from 'antd';
import React from 'react';

const SkeletonMovieItem = () => {
  return (
    <div className=" flex flex-col gap-3">
      <Skeleton.Image className="skeleton-movie-item-poster" active></Skeleton.Image>
      <Skeleton className="skeleton-movie-item-text" active></Skeleton>
    </div>
  );
};

export default SkeletonMovieItem;
