import ChangeInfo from '@/components/UserPage/settings/ChangeInfo/ChangeInfo';
import MyAccount from '@/components/UserPage/settings/MyAccount/MyAccount';
import MyMenu from '@/components/UserPage/settings/MyMenu/MyMenu';

import UserSettingsTabs from '@/components/UserPage/settings/UserSettingsTabs';
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
    <div className="w-full h-[calc(100vh)] sm:h-[calc(100vh-390px)]">
      <UserSettingsTabs />
      {myAccount && <MyAccount user={user!} userData={userData!} />}
      {changeInfo && <ChangeInfo user={user!} />}
      {myMenu && <MyMenu />}
      {deleteAccount && (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="font-semibold text-xl">업데이트 예정입니다.</h1>
        </div>
      )}
    </div>
  );
};

export default UserSettingsPage;
