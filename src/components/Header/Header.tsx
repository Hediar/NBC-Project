import React from 'react';
import AuthButton from './_auth/AuthButtons';
import HeaderUser from './HeaderUser';
import Link from 'next/link';
import HiddenServerFunctions from './_auth/HiddenServerFunctions';
import ModalControlCentre from './_auth/ModalControlCentre';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Logo from '@/styles/svg/Logo';
import Nav from './Nav';

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
      <div className="h-20 shadow-md shadow-gray-300 flex items-center px-4 justify-between bg-white">
        <div className="flex items-center">
          <Link href={'/'} className="text-white text-xl font-bold tracking-wider">
            <Logo />
          </Link>
          <Nav />
        </div>

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
