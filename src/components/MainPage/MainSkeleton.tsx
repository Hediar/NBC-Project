import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';
import React from 'react';

const MainSkeleton = () => {
  return (
    <div className="bg-gray-300 rounded-lg shadow-lg p-4">
      <div className="w-full h-[330px] sm:h-[400px] md:h-[460px] lg:h-[665px] xl:h-[500px] 2xl:h-[720px]">
        <Skeleton.Image active={true} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="mt-4">
        <Skeleton.Input active={true} size={'large'} block={true} />
      </div>
    </div>
  );
};

export default MainSkeleton;
