import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import UserPageSemiHeader from './SemiHeader';
import Fallback from './PersonalRecords/_PersonalRecords.fallback';
import UserPagePersonalRecords from './PersonalRecords/_PersonalRecords';
import UserPageMostWatchedGenres from './MostWatchedGenres';

interface Props {
  params: {
    username: string;
  };
}

const UserInfo = async ({ params }: Props) => {
  const username = decodeURIComponent(params.username);

  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from('users').select().eq('username', username);
  const { id, name, avatar_url } = data![0];

  return (
    <>
      <UserPageSemiHeader params={username} avatar_url={avatar_url} />
      <Suspense fallback={<Fallback />}>
        <UserPagePersonalRecords params={username} />
      </Suspense>
      <UserPageMostWatchedGenres params={username} />
    </>
  );
};

export default UserInfo;
