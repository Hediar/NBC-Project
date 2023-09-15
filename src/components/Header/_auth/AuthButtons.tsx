import SignOutButton from './SignOutButton';
import authApi from '@/util/supabase/auth/auth';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';

const AuthButton = async () => {
  const { session } = await authApi.get('session');

  if (session) {
    return (
      <>
        <SignOutButton />
      </>
    );
  } else {
    return (
      <div className="body1_regular_suit flex gap-[2px] items-center">
        <SignInButton />
        <div className="w-[1px] h-3.5 flex-shrink-0 bg-gray-600"></div>
        <SignUpButton />
      </div>
    );
  }
};

export default AuthButton;
