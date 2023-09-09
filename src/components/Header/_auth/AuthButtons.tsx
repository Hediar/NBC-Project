import SignOutButton from './SignOutButton';
import Link from 'next/link';
import getSession from '@/util/supabase/auth/authApi';

export const dynamic = 'force-dynamic';

const AuthButton = async () => {
  const { session } = await getSession('session');

  if (session) {
    return (
      <>
        <SignOutButton />
      </>
    );
  } else {
    return (
      <div className="body1_regular_suit flex gap-[10px] items-center">
        <Link href={'?sign-in=true'} className="pt-[2px] hover:font-semibold animate-200">
          로그인
        </Link>
        <div className="w-[1px] h-3 flex-shrink-0 bg-gray-600"></div>
        <Link href="?sign-up=true" className="pt-[2px] hover:font-semibold animate-200">
          회원가입
        </Link>
      </div>
    );
  }
};

export default AuthButton;
