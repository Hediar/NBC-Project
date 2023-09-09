'use client';

import React, { useState } from 'react';
import { DropdownMenu } from '@/styles/icons/Icons24';
import { Popover } from 'antd';
import Link from 'next/link';

type UserData = Database['public']['Tables']['users']['Row'];

const HeaderMenuButton = ({ userData }: { userData: UserData }) => {
  const username = userData.username;

  const menu = (
    <div className="flex flex-col p-3 gap-2 body1_regular_suit">
      <Link className="text-center hover:opacity-80" href={'/'}>
        홈
      </Link>
      <Link className="text-center hover:opacity-80" href={'/movielist'}>
        영화
      </Link>
      <Link className="text-center hover:opacity-80" href={'/review'}>
        리뷰
      </Link>
      <Link className="text-center hover:opacity-80" href={'/discussion/list'}>
        토론
      </Link>
      <Link className="text-center hover:opacity-80" href={`/user-page/${username}/info`}>
        유저 페이지
      </Link>
      <Link className="text-center hover:opacity-80" href={`/user-page/${username}/settings`}>
        유저 설정
      </Link>
    </div>
  );
  return (
    <div className="relative flex flex-col ">
      <Popover placement="bottom" content={menu} trigger="click">
        <DropdownMenu className="transform ease-in-out duration-200 hover:scale-110 cursor-pointer" />
      </Popover>
    </div>
  );
};

export default HeaderMenuButton;
