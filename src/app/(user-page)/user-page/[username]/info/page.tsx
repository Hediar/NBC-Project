import UserPagePersonalRecords from '@/components/UserPage/UserInfo/PersonalRecords/PersonalRecords';
import UserPagePersonalRecordsGraph from '@/components/UserPage/UserInfo/PersonalRecords/PersonalRecordsGraph';
import UserPageSemiHeader from '@/components/UserPage/UserInfo/SemiHeader';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const UserInfoPage = async ({ params }: { params: { username: string } }) => {
  const pageUsername = decodeURIComponent(params.username);

  const supabase = createClientComponentClient<Database>();
  const avatarUrlPromise = supabase.from('users').select('avatar_url').eq('username', pageUsername).single();

  return (
    <div className="w-[96%] sm:w-10/12 h-full pb-20">
      <UserPageSemiHeader params={pageUsername} avatarUrlPromise={avatarUrlPromise} />
      <UserPagePersonalRecords params={pageUsername} />
      <UserPagePersonalRecordsGraph params={pageUsername} />
    </div>
  );
};

export default UserInfoPage;
