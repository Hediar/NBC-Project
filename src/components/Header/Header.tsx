import React from 'react';
import AuthButton from './_auth/AuthButtons';
import HeaderUser from './HeaderUser';
import Link from 'next/link';
import HiddenServerFunctions from './_auth/HiddenServerFunctions';
import ModalControlCentre from './_auth/ModalControlCentre';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const Header = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const userId = user?.id;

  const { data: userData, error: userDataError } = await supabase.from('users').select().eq('id', userId).single();

  return (
    <>
      <div className="h-20 shadow-md shadow-gray-300 flex items-center px-4 justify-between bg-gray-500">
        <Link href={'/'} className="text-white text-xl font-bold tracking-wider">
          무비바바
        </Link>
        <div className="flex gap-3 items-center">
          {userData && <HeaderUser userData={userData} />}
          <AuthButton />
        </div>
      </div>
      <HiddenServerFunctions />
      <ModalControlCentre signedInUserId={userId ?? ''} />
    </>
  );
};

export default Header;
