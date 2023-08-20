'use client';
import React, { useEffect, useRef, useState } from 'react';
import Message from './message';
import Link from 'next/link';

const passwordOnChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  set: React.Dispatch<React.SetStateAction<string>>
) => {
  set(e.target.value);
};

function SignUpPage() {
  const emailValue = useRef<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmingPasswordValue, setConfirmingPasswordValue] = useState<string>('');

  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);

  useEffect(() => {
    if (!passwordValue || !confirmingPasswordValue) {
      setIsPasswordMatch(false);
      return;
    }
    if (passwordValue !== confirmingPasswordValue) {
      setIsPasswordMatch(false);
      return;
    } else {
      setIsPasswordMatch(true);
      return;
    }
  }, [passwordValue, confirmingPasswordValue]);

  return (
    <div className="flex justify-center items-center h-full bg-gray-200">
      <form
        action="/auth/sign-up"
        method="post"
        className="flex flex-col gap-3 shadow-lg shadow-gray-300 w-96 p-9 items-center bg-slate-50 rounded-md "
      >
        <h1>Sign Up Page</h1>
        <input
          className="border border-slate-400 p-2 w-full rounded-md"
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => (emailValue.current = e.target.value)}
          required
        />
        <input
          className="border border-slate-400 p-2 w-full rounded-md"
          type="password"
          name="password"
          placeholder="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          required
          onChange={(e) => passwordOnChangeHandler(e, setPasswordValue)}
        />
        <input
          className="border border-slate-400 p-2 w-full rounded-md "
          type="password"
          name="confirming password"
          placeholder="confirm password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          required
          onChange={(e) => passwordOnChangeHandler(e, setConfirmingPasswordValue)}
        />
        <input
          className="border border-slate-900 p-2 cursor-pointer w-full rounded-md disabled:bg-slate-100 mt-5"
          type="submit"
          value={'회원가입하기'}
          disabled={!isPasswordMatch}
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
}

export default SignUpPage;
