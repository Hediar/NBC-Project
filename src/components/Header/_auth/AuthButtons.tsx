import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SignOutButton from './SignOutButton';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';
import UserInfo from './UserInfo';

export const dynamic = 'force-dynamic';

const AuthButton = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    const providerFromMeta = session.user.app_metadata.provider;
    const emailFromMeta = session.user.email;

    const { data: publicUsersProviderData, error } = await supabase
      .from('users')
      .select('provider, email')
      .eq('id', session.user.id)
      .single();

    // 유저 로그인 시에 provider가 안 되어 있으면 저장하기
    if (publicUsersProviderData!.provider === null || !publicUsersProviderData!.email) {
      await supabase
        .from('users')
        .update({ provider: providerFromMeta, email: emailFromMeta })
        .eq('id', session.user.id);
    }

    return (
      <>
        <SignOutButton />
        <UserInfo session={session} />
      </>
    );
  } else {
    return (
      <>
        <SignInButton />
        <SignUpButton />
      </>
    );
  }
};

export default AuthButton;
