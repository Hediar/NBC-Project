'use client';
import Link from 'next/link';
import React from 'react';

interface Props {
  username: string;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderUserDropdownMenu = ({ username, isMenuOpen, setIsMenuOpen }: Props) => {
  const menuClickAndCloseMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="absolute w-28 top-8 flex flex-col z-10 divide-y  divide-gray-100 rounded-lg shadow bg-gray-700 text-white p-4 ">
      <Link
        onClick={menuClickAndCloseMenu}
        className="text-center pb-2 hover:opacity-80"
        href={`/user-page/${username}/info`}
      >
        유저 페이지
      </Link>
      <Link
        onClick={menuClickAndCloseMenu}
        className="text-center pt-2 hover:opacity-80"
        href={`/user-page/${username}/settings`}
      >
        유저 설정
      </Link>
    </div>
  );
};

export default HeaderUserDropdownMenu;
