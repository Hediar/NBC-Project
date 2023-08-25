import React from 'react';
import Image from 'next/image';

interface Props {
  params: string;
  avatar_url: string;
}

const UserPageSemiHeader = async ({ params: username, avatar_url }: Props) => {
  return (
    <div className="mt-7 w-8/12 bg-slate-500 p-6 rounded-xl">
      <div className="flex gap-6 items-center">
        <div className="rounded-full overflow-hidden">
          <Image
            className="w-12 h-12"
            src={avatar_url}
            alt="user profile"
            width={80}
            height={80}
            placeholder="blur"
            blurDataURL={'/anonymous-avatar-icon.png'}
          />
        </div>
        <h1 className="text-white text-xl">{username}</h1>
      </div>
    </div>
  );
};

export default UserPageSemiHeader;
