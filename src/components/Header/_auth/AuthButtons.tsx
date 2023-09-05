import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SignOutButton from './SignOutButton';
import saveUserProvider from '@/api/supabase/saveUserProviderIfNotSaved';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const AuthButton = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    await saveUserProvider(session, supabase);
    return (
      <>
        <SignOutButton />
      </>
    );
  } else {
    return (
      <div className="body1_regular_suit flex gap-[10px] items-center">
        <Link href={'?sign-in=true'} className="pt-[2px]">
          로그인
        </Link>
        <div className="w-[1px] h-3 flex-shrink-0 bg-gray-600"></div>
        <Link href="?sign-up=true" className="pt-[2px]">
          회원가입
        </Link>
      </div>
    );
  }
};

export default AuthButton;
