import AuthButton from './_auth/AuthButtons';
import HeaderUser from './HeaderUser';
import Link from 'next/link';
import ModalControlCentre from './_auth/ModalControlCentre';
import Logo from '@/styles/svg/Logo';
import Nav from './Nav';
import authApi from '@/util/supabase/auth/auth';
import publicApi from '@/util/supabase/auth/public';
import generateUniqueRandomUsername from '@/api/generateUsername/generateUniqueRandomUsername';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Header = async () => {
  const { userId } = await authApi.get('userId');

  if (userId) {
    const { username } = await publicApi.get('id to username', { id: userId });
    if (!username) {
      const supabase = createClientComponentClient();
      const newUsername = await generateUniqueRandomUsername(supabase);
      const { error } = await supabase.from('users').update({ username: newUsername }).eq('id', userId);
      if (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <header className="flex justify-center h-[70px] border-b border-[#ebebeb] bg-white">
        <div className="w-11/12 xl:w-10/12 h-full flex items-center justify-between animate-300">
          <div className="flex items-center gap-[60px]">
            <Link href={'/'} className="text-white text-xl font-bold tracking-wider">
              <Logo className="hidden sm:block" />
              <Logo className="sm:hidden" width={120} />
              <span className="sr-only">Logo</span>
            </Link>
            <Nav />
          </div>
          <div className=" flex items-center">
            <HeaderUser />
            <AuthButton />
          </div>
        </div>
      </header>
      <ModalControlCentre userId={userId ?? ''} />
    </>
  );
};

export default Header;
