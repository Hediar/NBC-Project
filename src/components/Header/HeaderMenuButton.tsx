'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import HeaderUserDropdownMenu from './HeaderUserDropdownMenu';

type UserData = Database['public']['Tables']['users']['Row'];

const HeaderMenuButton = ({ userData }: { userData: UserData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="relative flex flex-col">
      <Image
        className="cursor-pointer opacity-70 hover:opacity-100 transform hover:scale-110 hover:ease-out duration-200"
        alt="dropdown"
        src="/dropdown-arrow.svg"
        width={26}
        height={26}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && (
        <HeaderUserDropdownMenu username={userData.username!} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}
    </div>
  );
};

export default HeaderMenuButton;
