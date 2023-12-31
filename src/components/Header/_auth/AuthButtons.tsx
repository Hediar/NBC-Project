'use client';

import SignOutButton from './SignOutButton';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';
import useUserInfoStore from '@/store/saveCurrentUserData';

const AuthButton = () => {
  const { userInfo } = useUserInfoStore();

  return userInfo.id ? (
    <SignOutButton />
  ) : (
    <div className="body1_regular_suit flex gap-[2px] items-center">
      <SignInButton />
      <div className="w-[1px] h-3.5 flex-shrink-0 bg-gray-600"></div>
      <SignUpButton />
    </div>
  );
};

export default AuthButton;
