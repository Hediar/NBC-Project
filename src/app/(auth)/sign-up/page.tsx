'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Message from '@/components/Auth/Message';
import SubmitButton from '@/components/Auth/SubmitButton';
import SocialButtons from '@/components/Auth/SocialButtons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useRouter } from 'next/navigation';

const passwordOnChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  set: React.Dispatch<React.SetStateAction<string>>
) => {
  set(e.target.value);
};

function SignUpPage() {
  const router = useRouter();
  const emailValue = useRef<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmingPasswordValue, setConfirmingPasswordValue] = useState<string>('');
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<any>();

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

  const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', emailValue.current);
    formData.append('password', passwordValue);
    formData.append('captchaToken', captchaToken);

    const res = await fetch('/auth/sign-up', { method: 'post', body: formData });

    if (res) {
      const data = await res.json();
      if (data.message === 'User already registered.') {
        setIsError(true);
        router.refresh();
        router.push(`http://localhost:3000/sign-up?error=이미 등록된 메일입니다.`);
      }
      if (data.message.includes('captcha 오류')) {
        setIsError(true);
        router.refresh();
        router.push(`http://localhost:3000/sign-up?error=captcha오류입니다. 다시 시도해주세요.`);
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
        // action="/auth/sign-up"
        // method="post"
        onSubmit={signupHandler}
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
          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          required
          onChange={(e) => passwordOnChangeHandler(e, setPasswordValue)}
          autoComplete="new-password"
        />
        <input
          className="border border-slate-400 p-2 w-full rounded-md "
          type="password"
          name="confirming password"
          placeholder="confirm password"
          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          required
          onChange={(e) => passwordOnChangeHandler(e, setConfirmingPasswordValue)}
        />
        <HCaptcha
          // sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
          sitekey="10000000-ffff-ffff-ffff-000000000001"
          onVerify={(token) => {
            setCaptchaToken(token);
          }}
        />

        <SubmitButton
          inputValue="회원가입하기"
          loadingMessage="회원가입 요청 중..."
          shouldDisable={!isPasswordMatch}
          isError={isError}
          setIsError={setIsError}
        />
        <Link
          className="border border-slate-900 p-2 cursor-pointer w-full rounded-md flex justify-center "
          href={process.env.NEXT_PUBLIC_BASE_URL!}
        >
          돌아가기
        </Link>
        <Message />
        <SocialButtons />
      </form>
    </div>
  );
}

export default SignUpPage;
