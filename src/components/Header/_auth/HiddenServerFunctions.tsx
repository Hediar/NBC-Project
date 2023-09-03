import React from 'react';
import getSignedInUserData_Public_Users from '@/api/supabase/getSignedInUserData(Public-Users)';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SaveUserInfoToStore from './SaveUserInfoToStore';

// 세션이 무조건 있음.
const HiddenServerFunctions = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return <></>;

  const signedInUserId = user.id;

  const { data: userData } = await getSignedInUserData_Public_Users(signedInUserId);

  return (
    <>
      <SaveUserInfoToStore userData={userData} />
    </>
  );
};

export default HiddenServerFunctions;
