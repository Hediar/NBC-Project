import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import UserPageTabsClient from './UserPageTabsClient';

const UserPageTabs = async ({ username }: { username: string }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: signedInUserData, error: userNotSignedIn } = await supabase.auth.getUser();

  return (
    <UserPageTabsClient username={username} signedInUserData={signedInUserData} userNotSignedIn={userNotSignedIn} />
  );
};

export default UserPageTabs;
