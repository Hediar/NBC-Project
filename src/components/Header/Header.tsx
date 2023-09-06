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
      <header className="flex justify-center h-[70px] border-b border-[#ebebeb] bg-white">
        <div className="w-11/12 xl:w-10/12 h-full flex items-center justify-between animate-300">
          <div className="flex items-center gap-[60px]">
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
      </header>
      <HiddenServerFunctions />
      <ModalControlCentre signedInUserId={userId ?? ''} />
    </>
  );
};

export default Header;
