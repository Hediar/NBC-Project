'use client';

import {
  BookOutlined,
  FileTextOutlined,
  HeartOutlined,
  MenuOutlined,
  SettingOutlined,
  StarOutlined,
  UserOutlined
} from '@ant-design/icons';
import { FloatButton } from 'antd';
import React from 'react';

const HiddenUserPageTabs = ({ username, userMatch }: { username: string; userMatch: boolean }) => {
  return (
    <div className="sm:hidden">
      <FloatButton.Group trigger="click" type="default" style={{ left: 24 }} icon={<MenuOutlined />}>
        <FloatButton href={`/user-page/${username}/info`} icon={<UserOutlined />} />
        <FloatButton href={`/user-page/${username}/recommendations`} icon={<StarOutlined />} />
        <FloatButton href={`/user-page/${username}/watch-later`} icon={<BookOutlined />} />
        <FloatButton href={`/user-page/${username}/likes`} icon={<HeartOutlined />} />
        <FloatButton href={`/user-page/${username}/reviews`} icon={<FileTextOutlined />} />
        {userMatch && (
          <FloatButton href={`/user-page/${username}/settings?my-account=true`} icon={<SettingOutlined />} />
        )}
      </FloatButton.Group>
    </div>
  );
};

export default HiddenUserPageTabs;
