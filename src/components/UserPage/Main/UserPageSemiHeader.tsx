import React from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

interface Props {
  params: string;
}

const UserPageSemiHeader = async ({ params: username }: Props) => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from('users').select().eq('username', username);
  const { id, name, avatar_url } = data![0];

  return (
    <div className="mt-7 w-8/12 bg-slate-500 p-6 rounded-xl">
      <div className="flex gap-6 items-center">
        <div className="rounded-full overflow-hidden">
          <Image
            className="w-12 h-12"
            src={avatar_url}
            alt="user profile"
            width={100}
            height={100}
            objectPosition="center"
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
