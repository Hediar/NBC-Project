'use client';

import React from 'react';
import { DropdownMenu } from '@/styles/icons/Icons24';
import { Dropdown, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';

const defaultItem = [
  {
    label: <span>홈</span>,
    key: '홈'
  },
  {
    label: <span>영화</span>,
    key: '영화'
  },
  {
    label: <span>리뷰</span>,
    key: '리뷰'
  },
  {
    label: <span>토론</span>,
    key: '토론'
  }
];

const singedInItem = [
  {
    label: <span className="text-center">홈</span>,
    key: '홈'
  },
  {
    label: <span>영화</span>,
    key: '영화'
  },
  {
    label: <span>리뷰</span>,
    key: '리뷰'
  },
  {
    label: <span>토론</span>,
    key: '토론'
  },
  {
    label: <span>유저 페이지</span>,
    key: '유저 페이지'
  },
  {
    label: <span>유저 설정</span>,
    key: '유저 설정'
  }
];

type UserData = Database['public']['Tables']['users']['Row'] | null;

const HeaderMenuButton = ({ userData }: { userData: UserData }) => {
  const username = userData?.username;
  const router = useRouter();

  const items: MenuProps['items'] = userData?.id ? singedInItem : defaultItem;

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '홈') {
      router.push('/');
    } else if (key === '영화') {
      router.push('/movielist');
    } else if (key === '리뷰') {
      router.push('/review');
    } else if (key === '토론') {
      router.push('/discussion/list');
    } else if (key === '유저 페이지') {
      router.push(`/user-page/${username}/info`);
    } else if (key === '유저 설정') {
      router.push(`/user-page/${username}/settings`);
    }
  };

  return (
    <div className="relative flex flex-col text-center">
      <Dropdown overlayStyle={{ textAlign: 'center' }} menu={{ items, onClick }} trigger={['click']}>
        <DropdownMenu className="transform ease-in-out duration-200 hover:scale-110 cursor-pointer" />
      </Dropdown>
    </div>
  );
};

export default HeaderMenuButton;
