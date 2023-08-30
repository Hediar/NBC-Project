'use client';

import React, { useState } from 'react';
import SubmitButton from '@/components/Auth/SubmitButton';
import { useRouter } from 'next/navigation';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import SocialButtons from '@/components/Auth/SocialButtons';
import useToggleSignInModal from '@/store/toggleSignInModal';
import useToggleForgotPassword from '@/store/toggleForgotPassword';

interface Data {
  error: boolean;
  message: string;
}

const SignIn = () => {
  const router = useRouter();
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [shouldDisable, setShouldDisable] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<any>();
  const [isError, setIsError] = useState<boolean>(false);
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();
  const { isForgotPasswordOpen, setIsForgotPasswordOpen } = useToggleForgotPassword();
  const [message, setMessage] = useState<string>('');

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
        setMessage('captcha오류입니다. 다시 시도해주세요.');
      }
      if (message.includes('틀립니다')) {
        setIsError(true);
        setMessage('이메일이나 비밀번호가 틀립니다.');
      }
      if (message.includes('에러가')) {
        setIsError(true);
        setMessage('에러가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      router.refresh();
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
        {!isForgotPasswordOpen && (
          <HCaptcha
            // sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
            sitekey="10000000-ffff-ffff-ffff-000000000001"
            onVerify={(token) => {
              setCaptchaToken(token);
            }}
          />
        )}

        <SubmitButton
          inputValue="로그인하기"
          loadingMessage="로그인 하는 중..."
          shouldDisable={shouldDisable}
          isError={isError}
          setIsError={setIsError}
          passwordError={passwordError}
        />
        <button
          className="border border-slate-900 p-2 cursor-pointer w-full rounded-md flex justify-center"
          type="button"
          onClick={() => setIsSignInModalOpen(isSignInModalOpen)}
        >
          돌아가기
        </button>
        <button
          type="button"
          onClick={() => {
            // setIsSignInModalOpen(isSignInModalOpen);
            setIsForgotPasswordOpen(isForgotPasswordOpen);
          }}
          className="text-sm"
        >
          비밀번호를 잊어버리셨나요?
        </button>
        <span>{message}</span>
        <SocialButtons />
      </form>
    </div>
  );
};

export default SignIn;
