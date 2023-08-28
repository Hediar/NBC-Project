'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import SubmitButton from '@/components/Auth/SubmitButton';
import { useRouter } from 'next/navigation';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Message from '@/components/Auth/Message';

interface Data {
  error: boolean;
  message: string;
}

const SignInPage = () => {
  const router = useRouter();
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [shouldDisable, setShouldDisable] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<any>();
  const [isError, setIsError] = useState<boolean>(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPasswordValue(newPassword);

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(newPassword)) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 하며, 최소 하나의 대문자, 소문자, 숫자가 포함되어야 합니다.');
    } else {
      setPasswordError(null);
    }
  };

  const signInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', emailValue);
    formData.append('password', passwordValue);
    formData.append('captchaToken', captchaToken);

    const res = await fetch('/auth/sign-in', { method: 'post', body: formData });

    const { error, message } = (await res.json()) as Data;

    if (error) {
      if (message.includes('captcha 오류')) {
        setIsError(true);
        router.refresh();
        router.push(`http://localhost:3000/sign-in?error=captcha오류입니다. 다시 시도해주세요.`);
      }
      if (message.includes('틀립니다')) {
        setIsError(true);
        router.refresh();
        router.push(`http://localhost:3000/sign-in?error=${message}`);
      }
      if (message.includes('에러가')) {
        setIsError(true);
        router.refresh();
        router.push(`http://localhost:3000/sign-in?error=${message}`);
      }
      router.refresh();
    } else {
      router.refresh();
      router.push(`http://localhost:3000`);
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-200">
      <form
        onSubmit={signInHandler}
        className="flex flex-col gap-3 shadow-lg shadow-gray-300 w-96 p-9 items-center bg-slate-50 rounded-md"
      >
        <h1>Sign In Page</h1>
        <input
          className="border border-slate-400 p-2 w-full rounded-md"
          type="email"
          name="email"
          placeholder="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          required
        />
        <input
          className="border border-slate-400 p-2 w-full rounded-md"
          type="password"
          name="password"
          placeholder="password"
          value={passwordValue}
          onChange={(e) => handlePasswordChange(e)}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          required
        />
        <HCaptcha
          // sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
          sitekey="10000000-ffff-ffff-ffff-000000000001"
          onVerify={(token) => {
            setCaptchaToken(token);
          }}
        />
        <SubmitButton
          inputValue="로그인하기"
          loadingMessage="로그인 하는 중..."
          shouldDisable={shouldDisable}
          isError={isError}
          setIsError={setIsError}
          passwordError={passwordError}
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
