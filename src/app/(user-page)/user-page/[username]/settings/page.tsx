import ChangeEmail from '@/components/UserPage/settings/ChangeEmail';
import UserSettingsTabs from '@/components/UserPage/settings/UserSettingsTabs';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const UserSettingsPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const userEmail = user!.email as string;
  const appMetadata = user!.app_metadata;

  return (
    <div className="flex w-8/12 pt-10 h-[calc(100vh-134px)]">
      <UserSettingsTabs />
      <ChangeEmail appMetadata={appMetadata} userPrevEmail={userEmail} />
    </div>
  );
};

export default UserSettingsPage;
