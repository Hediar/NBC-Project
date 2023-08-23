import UserPageMostWatchedGenres from '@/components/UserPage/UserInfo/MostWatchedGenres';
import UserPagePersonalRecords from '@/components/UserPage/UserInfo/PersonalRecords/_PersonalRecords';
import Fallback from '@/components/UserPage/UserInfo/PersonalRecords/_PersonalRecords.fallback';
import UserPageSemiHeader from '@/components/UserPage/UserInfo/SemiHeader';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

interface Props {
  params: {
    username: string;
  };
}

const UserInfoPage = async ({ params }: Props) => {
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
      <UserPageMostWatchedGenres username={username} />
    </>
  );
};

export default UserInfoPage;
