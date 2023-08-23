import React from 'react';
import AuthButton from './_auth/AuthButtons';
import HeaderUser from './HeaderUser';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

const Header = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  return (
    <div className="h-20 shadow-md shadow-gray-300 flex items-center px-4 justify-between bg-gray-500">
      <Link href={'/'} className="text-white text-xl font-bold tracking-wider">
        무비바바
      </Link>
      <div className="flex gap-3 items-center">
        {session && <HeaderUser session={session} />}
        <AuthButton />
      </div>
    </div>
  );
};

export default Header;
