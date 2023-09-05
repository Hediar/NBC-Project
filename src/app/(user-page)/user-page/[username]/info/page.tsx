import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import UserPagePersonalRecords from '@/components/UserPage/UserInfo/PersonalRecords/_PersonalRecords';
import Fallback from '@/components/UserPage/UserInfo/PersonalRecords/_PersonalRecords.fallback';
import UserPageSemiHeader from '@/components/UserPage/UserInfo/SemiHeader';
import InfographicRecords from '@/components/UserPage/UserInfo/PersonalRecords/Infographics/InfographicRecords';

export const dynamic = 'force-dynamic';

const UserInfoPage = async ({ params }: { params: { username: string } }) => {
  const username = decodeURIComponent(params.username);
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userInfo } = await supabase.from('users').select().eq('username', username).single();

  // layout에서 검증을 하므로 data는 확실하여 !사용
  const { id, avatar_url } = userInfo!;

  return (
    <section className="w-full flex flex-col items-center h-[calc(100vh-134px)]">
      <UserPageSemiHeader params={username} avatar_url={avatar_url!} />
      <Suspense fallback={<Fallback />}>
        <UserPagePersonalRecords params={username} />
        <InfographicRecords params={username} />
      </Suspense>
    </section>
  );
};

export default UserInfoPage;
