import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SaveUserInfoToStore from './SaveUserInfoToStore';

export const dynamic = 'force-dynamic';

// 세션이 무조건 있음.
const HiddenServerFunctions = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return <></>;

  const signedInUserId = user.id;

  const { data: userData, error } = await supabase.from('users').select().eq('id', signedInUserId).single();

  if (error) return <></>;

  return (
    <>
      <SaveUserInfoToStore userData={userData} />
    </>
  );
};

export default HiddenServerFunctions;
