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
import { FloatButton, Tooltip } from 'antd';
import React from 'react';

const HiddenUserPageTabs = ({ username, userMatch }: { username: string; userMatch: boolean }) => {
  return (
    <div className="sm:hidden ">
      <FloatButton.Group trigger="click" type="default" style={{ left: 24 }} icon={<MenuOutlined />}>
        <FloatButton
          href={`/user-page/${username}/info`}
          icon={
            <Tooltip placement="right" title="내 정보">
              <UserOutlined />
            </Tooltip>
          }
        />
        <FloatButton
          href={`/user-page/${username}/recommendations`}
          icon={
            <Tooltip placement="right" title="추천 목록">
              <StarOutlined />
            </Tooltip>
          }
        />
        <FloatButton
          href={`/user-page/${username}/watch-later`}
          icon={
            <Tooltip placement="right" title="찜 목록">
              <BookOutlined />
            </Tooltip>
          }
        />
        <FloatButton
          href={`/user-page/${username}/likes`}
          icon={
            <Tooltip placement="right" title="좋아요 목록">
              <HeartOutlined />
            </Tooltip>
          }
        />
        <FloatButton
          href={`/user-page/${username}/reviews`}
          icon={
            <Tooltip placement="right" title="나의 리뷰">
              <FileTextOutlined />
            </Tooltip>
          }
        />
        {userMatch && (
          <FloatButton
            href={`/user-page/${username}/settings?my-account=true`}
            icon={
              <Tooltip placement="right" title="설정">
                <SettingOutlined />
              </Tooltip>
            }
          />
        )}
      </FloatButton.Group>
    </div>
  );
};

export default HiddenUserPageTabs;
