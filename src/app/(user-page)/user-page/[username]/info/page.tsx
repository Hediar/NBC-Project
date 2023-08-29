import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import UserPageMostWatchedGenres from '@/components/UserPage/UserInfo/MostWatchedGenres';
import UserPagePersonalRecords from '@/components/UserPage/UserInfo/PersonalRecords/_PersonalRecords';
import Fallback from '@/components/UserPage/UserInfo/PersonalRecords/_PersonalRecords.fallback';
import UserPageSemiHeader from '@/components/UserPage/UserInfo/SemiHeader';

export const dynamic = 'force-dynamic';

const UserInfoPage = async ({ params }: { params: { username: string } }) => {
  const username = decodeURIComponent(params.username);
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userInfo } = await supabase.from('users').select().eq('username', username);

  // layout에서 검증을 하므로 data는 확실하여 !사용
  const { avatar_url } = userInfo![0];

  return (
    <>
      <UserPageSemiHeader params={username} avatar_url={avatar_url!} />
      <Suspense fallback={<Fallback />}>
        <UserPagePersonalRecords params={username} />
      </Suspense>
      <UserPageMostWatchedGenres username={username} />
    </>
  );
};

export default UserInfoPage;
