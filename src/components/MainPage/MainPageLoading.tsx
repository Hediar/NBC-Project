'use client';
import { Skeleton } from 'antd';
import React from 'react';

const MainPageLoading = () => {
  return (
    <div className="w-[340px] sm:w-[720px] flex flex-col gap-3">
      <Skeleton.Image style={{ width: '720px', height: '420px' }} active></Skeleton.Image>
      <Skeleton.Image style={{ width: '240px', height: '280px' }} active></Skeleton.Image>
      <Skeleton style={{ width: '240px' }} active></Skeleton>
    </div>
  );
};

export default MainPageLoading;
