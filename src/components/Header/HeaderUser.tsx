'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { Session } from '@supabase/supabase-js';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import HeaderUserDropdownMenu from './HeaderUserDropdownMenu';
import { useRouter } from 'next/navigation';

const HeaderUser = ({ session }: { session: Session }) => {
  const { userInfo, saveUserInfo } = useUserInfoStore();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [avatar_url, setAvatar_url] = useState<string>();

  useEffect(() => {
    if (!userInfo.id) {
      setUsername('');
      setAvatar_url('');
    } else {
      setUsername(userInfo.username!);
      setAvatar_url(userInfo.avatar_url!);
    }
  }, [userInfo]);

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
