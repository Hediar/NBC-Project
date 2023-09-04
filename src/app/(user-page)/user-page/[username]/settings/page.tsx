import MyAccount from '@/components/UserPage/settings/Profile/MyAccount';
import UserSettingsTabs from '@/components/UserPage/settings/UserSettingsTabs';
import SVG_Settings from '@/styles/svg/settings';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type SearchParams = {
  'my-account'?: boolean | undefined;
  'change-info'?: boolean | undefined;
  'my-menu'?: boolean | undefined;
  'delete-account'?: boolean | undefined;
};

type Props = {
  params: { username: string };
  searchParams: SearchParams;
};

const UserSettingsPage = async ({ params: { username }, searchParams }: Props) => {
  const myAccount = searchParams['my-account'] ?? false;
  const changeInfo = searchParams['change-info'] ?? false;
  const myMenu = searchParams['my-menu'] ?? false;
  const deleteAccount = searchParams['delete-account'] ?? false;

  if (!myAccount && !changeInfo && !myMenu && !deleteAccount) {
    redirect(`${process.env.BASE_URL}/user-page/${username}/settings?my-account=true`);
  }

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
