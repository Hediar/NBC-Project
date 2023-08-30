import UserSettingsProfile from '@/components/UserPage/settings/UserSettingsProfile';
import UserSettingsTabs from '@/components/UserPage/settings/UserSettingsTabs';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const UserSettingsPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase.from('users').select('*').eq('id', user!.id).single();

  return (
    <div className="flex w-8/12 pt-10 h-[calc(100vh-134px)] gap-8 pb-8">
      <UserSettingsTabs />
      <UserSettingsProfile user={user!} userData={userData!} />
    </div>
  );
};

export default UserSettingsPage;
