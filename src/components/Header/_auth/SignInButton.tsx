import Link from 'next/link';
import React from 'react';

const SignInButton = () => {
  return (
    <Link
      href="/sign-in"
      className="h-full py-2 px-3 rounded-md shadow-sm shadow-gray-700 bg-slate-700 text-white active:bg-slate-600 text-sm flex items-center"
    >
      sign in
    </Link>
  );
};

export default SignInButton;
