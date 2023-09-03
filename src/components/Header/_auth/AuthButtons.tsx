import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SignOutButton from './SignOutButton';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';
import saveUserProvider from '@/api/supabase/saveUserProviderIfNotSaved';

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
      <>
        <SignInButton />
        <SignUpButton />
      </>
    );
  }
};

export default AuthButton;
