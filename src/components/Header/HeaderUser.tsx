'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { Session } from '@supabase/supabase-js';
import Image from 'next/image';
import { useState } from 'react';
import HeaderUserDropdownMenu from './HeaderUserDropdownMenu';

const HeaderUser = ({ session }: { session: Session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const {
    userInfo: { avatar_url, username }
  } = useUserInfoStore();

  return (
    <div className="flex gap-5 items-center mr-4">
      <h3 className="text-white">{username}</h3>
      {avatar_url && username && (
        <>
          <div className="rounded-full overflow-hidden">
            <Image
              className="w-10 h-10"
              src={avatar_url}
              alt="user profile"
              width={40}
              height={40}
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={'/anonymous-avatar-icon.png'}
            />
          </div>
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
              <HeaderUserDropdownMenu username={username} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderUser;
