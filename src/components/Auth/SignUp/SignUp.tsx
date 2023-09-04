'use client';

import React, { useEffect, useRef, useState } from 'react';
import SubmitButton from '@/components/Auth/SubmitButton';
import SocialButtons from '@/components/Auth/SocialButtons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { usePathname, useRouter } from 'next/navigation';
import { message } from 'antd';

function SignUp() {
  const router = useRouter();
  const path = usePathname() ?? '';
  const emailValue = useRef<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmingPasswordValue, setConfirmingPasswordValue] = useState<string>('');
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<any>();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const newPassword = e.target.value;
    set(newPassword);

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(newPassword)) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 하며, 최소 하나의 대문자, 소문자, 숫자가 포함되어야 합니다.');
    } else {
      setPasswordError(null);
    }
  };

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
    const data = await res.json();
    if (data.error) {
      if (data.message === 'User already registered.') {
        setIsError(true);
        messageApi.open({
          type: 'warning',
          content: '이미 등록된 이메일입니다.'
        });
      }
      if (data.message.includes('captcha 오류')) {
        setIsError(true);
        messageApi.open({
          type: 'error',
          content: 'captcha오류입니다. 다시 시도해주세요.'
        });
      }
      console.log(data.message);
      router.refresh();
    } else {
      router.refresh();
      router.replace(path);
      messageApi.open({
        type: 'success',
        content: '회원가입 완료!'
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center h-full bg-gray-200">
        <form
          onSubmit={signupHandler}
          className="flex flex-col gap-3 shadow-lg shadow-gray-300 w-96 p-9 items-center bg-slate-50 rounded-md "
        >
          <h1>Sign Up Page</h1>
          <input
            className="custom_input"
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => (emailValue.current = e.target.value)}
            required
          />
          <input
            className="custom_input"
            type="password"
            name="password"
            placeholder="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            onChange={(e) => handlePasswordChange(e, setPasswordValue)}
            autoComplete="new-password"
          />
          <input
            className="custom_input "
            type="password"
            name="confirming password"
            placeholder="confirm password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            onChange={(e) => handlePasswordChange(e, setConfirmingPasswordValue)}
          />
          <HCaptcha
            sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
            // sitekey="10000000-ffff-ffff-ffff-000000000001"
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
            passwordError={passwordError}
          />
          <div className="flex gap-2 items-center">
            <p className="text-sm">이미 아이디가 있으신가요?</p>
            <button type="button" onClick={() => router.replace('?sign-in=true')} className="hover:underline">
              로그인하기
            </button>
          </div>
          <>{message}</>
          <SocialButtons />
        </form>
      </div>
    </>
  );
}

export default SignUp;
