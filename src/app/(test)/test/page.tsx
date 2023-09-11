import Icon1 from '@/styles/svg/avatar/Icon1';
import Icon2 from '@/styles/svg/avatar/Icon2';
import Icon3 from '@/styles/svg/avatar/Icon3';
import Icon4 from '@/styles/svg/avatar/Icon4';
import Icon5 from '@/styles/svg/avatar/Icon5';
import avatar_url from '@/styles/svg/avatar/avatar.url';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const Page = () => {
  // const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <div className="w-full h-screen bg-slate-200">
      {/* <Spin className="centered " spinning={true} size="large" indicator={antIcon} /> */}
      <div className="bg-white rounded-full inline-block p-1">
        <Icon1 />
      </div>
      <Icon2 />
      <Icon3 />
      <Icon4 />
      <Icon5 />
    </div>
  );
};

export default Page;
