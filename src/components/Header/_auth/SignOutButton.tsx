'use client';

import useUserInfoStore from '@/app/(store)/saveCurrentUserData';
import React from 'react';

const SignOutButton = () => {
  const { deleteUserInfo } = useUserInfoStore();

  const clickHandler = () => {
    deleteUserInfo();
  };

  return (
    <form action="/auth/sign-out" method="post">
      <button
        onClick={clickHandler}
        className="h-full py-2 px-3 rounded-md shadow-sm shadow-gray-700 bg-slate-700 text-white active:bg-slate-600 text-sm flex items-center"
      >
        Sign out
      </button>
    </form>
  );
};

export default SignOutButton;
