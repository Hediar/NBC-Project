'use client';
import useUserInfoStore from '@/app/(store)/saveCurrentUserData';
import { Session } from '@supabase/supabase-js';
import Image from 'next/image';
import React from 'react';

const HeaderUser = ({ session }: { session: Session }) => {
  const {
    userInfo: { avatar_url, id, name, username }
  } = useUserInfoStore();
  let photoURL: string;
  if (!avatar_url) {
    photoURL = '/anonymous-avatar-icon.png';
  } else {
    photoURL = avatar_url;
  }
  return (
    <div className="flex gap-5 items-center mr-4">
      <h3 className="text-white">{username}</h3>
      {photoURL && username && (
        <div className="rounded-full overflow-hidden">
          <Image
            className="w-10 h-10"
            src={photoURL}
            alt="user profile"
            width={40}
            height={40}
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
            blurDataURL={'/anonymous-avatar-icon.png'}
          />
        </div>
      )}
    </div>
  );
};

export default HeaderUser;
