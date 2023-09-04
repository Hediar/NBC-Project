import MyAccount from '@/components/UserPage/settings/Profile/MyAccount';
import UserSettingsProfile from '@/components/UserPage/settings/UserSettingsProfile';
import UserSettingsTabs from '@/components/UserPage/settings/UserSettingsTabs';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

type SearchParams = {
  'my-account'?: boolean | undefined;
  'change-info'?: boolean | undefined;
  'my-menu'?: boolean | undefined;
  'delete-account'?: boolean | undefined;
};

const UserSettingsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const myAccount = searchParams['my-account'] ?? false;
  const changeInfo = searchParams['change-info'] ?? false;
  const myMenu = searchParams['my-menu'] ?? false;
  const deleteAccount = searchParams['delete-account'] ?? false;

  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase.from('users').select('*').eq('id', user!.id).single();

  return (
    <div className="flex w-10/12 pt-10 h-[calc(100vh-134px)] gap-8 pb-8 max-w-6xl">
      <UserSettingsTabs />
      {/* <UserSettingsProfile user={user!} userData={userData!} /> */}
      {myAccount && <MyAccount user={user!} userData={userData!} />}
      {changeInfo && <></>}
      {myMenu && <></>}
      {deleteAccount && <></>}
    </div>
  );
};

export default UserSettingsPage;
