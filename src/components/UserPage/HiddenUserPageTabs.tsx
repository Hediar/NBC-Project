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
import { use } from 'react';

interface Props {
  username: string;
  isUserMatchPromise: Promise<boolean>;
}

const HiddenUserPageTabs = ({ username, isUserMatchPromise }: Props) => {
  const isUserMatch = use(isUserMatchPromise);
  return (
    <div className="sm:hidden ">
      <FloatButton.Group trigger="click" type="default" style={{ left: 24 }} icon={<MenuOutlined />}>
        <FloatButton
          href={`/user-page/${username}/info`}
          icon={
            <Tooltip placement="right" title="내 정보">
              <UserOutlined />
              <span className="sr-only">내 정보</span>
            </Tooltip>
          }
        />
        <FloatButton
          href={`/user-page/${username}/recommendations`}
          icon={
            <Tooltip placement="right" title="추천 목록">
              <StarOutlined />
              <span className="sr-only">추천 목록</span>
            </Tooltip>
          }
        />
        <FloatButton
          href={`/user-page/${username}/watch-later`}
          icon={
            <Tooltip placement="right" title="찜 목록">
              <BookOutlined />
              <span className="sr-only">찜 목록</span>
            </Tooltip>
          }
        />
        <FloatButton
          href={`/user-page/${username}/likes`}
          icon={
            <Tooltip placement="right" title="좋아요 목록">
              <HeartOutlined />
              <span className="sr-only">좋아요 목록</span>
            </Tooltip>
          }
        />
        <FloatButton
          href={`/user-page/${username}/reviews`}
          icon={
            <Tooltip placement="right" title="나의 리뷰">
              <FileTextOutlined />
              <span className="sr-only">나의 리뷰</span>
            </Tooltip>
          }
        />
        {isUserMatch && (
          <FloatButton
            href={`/user-page/${username}/settings?my-account=true`}
            icon={
              <Tooltip placement="right" title="설정">
                <SettingOutlined />
                <span className="sr-only">설정</span>
              </Tooltip>
            }
          />
        )}
      </FloatButton.Group>
    </div>
  );
};

export default HiddenUserPageTabs;
