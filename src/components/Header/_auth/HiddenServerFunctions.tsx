import React from 'react';
import SaveUserInfoToStore from './SaveUserInfoToStore';
import saveUserProviderWithEmail from '@/api/supabase/saveUserProviderWithEmail';
import authApi from '@/util/supabase/auth/auth';

export const dynamic = 'force-dynamic';

// 세션이 무조건 있음.
const HiddenServerFunctions = async () => {
  const { session } = await authApi.get('session');
  const { userData } = await authApi.get('userData');
  const user = session?.user;

  if (!user || !userData) return <></>;

  await saveUserProviderWithEmail();

  return (
    <>
      <SaveUserInfoToStore userData={userData} />
    </>
  );
};

export default HiddenServerFunctions;
