import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const Page = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <div className="w-full h-screen">
      <Spin className="centered " spinning={true} size="large" indicator={antIcon} />
    </div>
  );
};

export default Page;
