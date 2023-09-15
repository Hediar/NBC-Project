'use client';

import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const items: MenuProps['items'] = [
  {
    label: '내 계정',
    key: 'my-account'
  },
  {
    label: '정보 변경',
    key: 'change-info'
  },
  {
    label: '나의 메뉴',
    key: 'my-menu'
  }
  // {
  //   label: '계정 삭제',
  //   key: 'delete-account'
  // }
];

const UserSettingsTabs = () => {
  const [current, setCurrent] = useState('mail');
  const router = useRouter();

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === items[0]?.key) router.replace('?my-account=true');
    if (e.key === items[1]?.key) router.replace('?change-info=true');
    if (e.key === items[2]?.key) router.replace('?my-menu=true');
    if (e.key === items[3]?.key) router.replace('?delete-account=true');
    setCurrent(e.key);
  };

  return (
    <Menu
      className="flex text-[14px] gap-0 sm:gap-4 justify-center sm:justify-normal sm:px-8 sm:text-[16px] font-semibold"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default UserSettingsTabs;
