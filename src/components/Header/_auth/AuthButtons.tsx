import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SignOutButton from './SignOutButton';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';

const AuthButton = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    return <SignOutButton />;
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
