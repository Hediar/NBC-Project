'use client';

import React, { useState } from 'react';
import HeaderUserDropdownMenu from './HeaderUserDropdownMenu';
import { DropdownMenu } from '@/styles/icons/Icons24';

type UserData = Database['public']['Tables']['users']['Row'];

const HeaderMenuButton = ({ userData }: { userData: UserData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="relative flex flex-col">
      <DropdownMenu
        className="transform ease-in-out duration-200 hover:scale-110 cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && (
        <HeaderUserDropdownMenu username={userData.username!} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}
    </div>
  );
};

export default HeaderMenuButton;
