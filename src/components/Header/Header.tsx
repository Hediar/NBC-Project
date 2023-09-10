import AuthButton from './_auth/AuthButtons';
import HeaderUser from './HeaderUser';
import Link from 'next/link';
import HiddenServerFunctions from './_auth/HiddenServerFunctions';
import ModalControlCentre from './_auth/ModalControlCentre';
import Logo from '@/styles/svg/Logo';
import Nav from './Nav';
import authApi from '@/util/supabase/auth/auth';

const Header = async () => {
  const { userId } = await authApi.get('userId');

  return (
    <>
      <header className="flex justify-center h-[70px] border-b border-[#ebebeb] bg-white">
        <div className="w-11/12 xl:w-10/12 h-full flex items-center justify-between animate-300">
          <div className="flex items-center gap-[60px]">
            <Link href={'/'} className="text-white text-xl font-bold tracking-wider">
              <Logo className="hidden sm:block" />
              <Logo className="sm:hidden" width={120} />
            </Link>
            <Nav />
          </div>
          <div className="flex-row-reverse sm:flex-row flex items-center">
            <HeaderUser />
            <AuthButton />
          </div>
        </div>
      </header>
      <HiddenServerFunctions />
      <ModalControlCentre userId={userId ?? ''} />
    </>
  );
};

export default Header;
