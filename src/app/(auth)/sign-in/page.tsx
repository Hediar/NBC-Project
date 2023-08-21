import Link from 'next/link';
import React from 'react';
import Message from './message';

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-full bg-gray-200">
      <form
        action="/auth/sign-in"
        method="post"
        className="flex flex-col gap-3 shadow-lg shadow-gray-300 w-96 p-9 items-center bg-slate-50 rounded-md"
      >
        <h1>Sign In Page</h1>
        <input
          className="border border-slate-400 p-2 w-full rounded-md"
          type="email"
          name="email"
          placeholder="email"
          required
        />
        <input
          className="border border-slate-400 p-2 w-full rounded-md"
          type="password"
          name="password"
          placeholder="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          required
        />
        <input
          className="border border-slate-900 p-2 cursor-pointer w-full rounded-md disabled:bg-slate-100 mt-5"
          type="submit"
          value={'로그인하기'}
        />
        <Link
          className="border border-slate-900 p-2 cursor-pointer w-full rounded-md flex justify-center "
          href={process.env.NEXT_PUBLIC_BASE_URL!}
        >
          돌아가기
        </Link>
        <Message />
      </form>
    </div>
  );
};

export default SignInPage;
