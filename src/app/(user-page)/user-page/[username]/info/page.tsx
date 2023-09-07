import UserPagePersonalRecords from '@/components/UserPage/UserInfo/PersonalRecords/PersonalRecords';
import UserPagePersonalRecordsGraph from '@/components/UserPage/UserInfo/PersonalRecords/PersonalRecordsGraph';
import UserPageSemiHeader from '@/components/UserPage/UserInfo/SemiHeader';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const UserInfoPage = async ({ params }: { params: { username: string } }) => {
  const username = decodeURIComponent(params.username);
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userInfo } = await supabase.from('users').select().eq('username', username).single();

  // layout에서 검증을 하므로 data는 확실하여 !사용
  const { id, avatar_url } = userInfo!;

  return (
    <div className="w-10/12 h-screen xl:pb-[200px] ">
      <UserPageSemiHeader params={username} avatar_url={avatar_url!} />
      <UserPagePersonalRecords params={username} />
      <UserPagePersonalRecordsGraph params={username} />
    </div>
  );
};

export default UserInfoPage;
