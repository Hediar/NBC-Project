import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import UserPageTabsClient from './UserPageTabsClient';

const UserPageTabs = async ({ username }: { username: string }) => {
  const error = { isError: false };
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: signedInUserData, error: userNotSignedIn } = await supabase.auth.getUser();
  if (userNotSignedIn) {
    error.isError = true;
  }

  return <UserPageTabsClient username={username} signedInUserData={signedInUserData} userNotSignedIn={error} />;
};

export default UserPageTabs;
