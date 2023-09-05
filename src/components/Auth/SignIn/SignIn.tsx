'use client';

import React, { useEffect, useRef, useState } from 'react';
import SubmitButton from '@/components/Auth/SubmitButton';
import { usePathname, useRouter } from 'next/navigation';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import SocialButtons from '@/components/Auth/SocialButtons';
import SVG_ShowPassword from '@/styles/svg/SVG_ShowPassword';
import SVG_HidePassword from '@/styles/svg/SVG_HidePassword';
import { message } from 'antd';

interface Data {
  error: boolean;
  message: string;
}

const SignIn = () => {
  const path = usePathname() ?? '';
  const router = useRouter();
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [shouldDisable, setShouldDisable] = useState<boolean>(true);
  const [captchaToken, setCaptchaToken] = useState<any>();
  const [isError, setIsError] = useState<boolean>(false);

  // const [message, setMessage] = useState<string>('');
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const saveEmailCheckboxRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const outerDivRef = useRef<HTMLDivElement>(null);
  const captcha = useRef();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const savedEmail = localStorage.getItem('saved_email');
    if (savedEmail) {
      saveEmailCheckboxRef.current!.checked = true;
      setEmailValue(savedEmail);
    }
  }, []);

  useEffect(() => {
    if (passwordValue.length < 6) {
      setShouldDisable(true);
    }
    if (emailValue.length > 6 && passwordValue.length > 6) {
      setShowCaptcha(true);
      setShouldDisable(false);
    }
  }, [emailValue, passwordValue]);

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
        messageApi.open({
          type: 'error',
          content: 'captcha오류입니다. 다시 시도해주세요.'
        });
        // setMessage('captcha오류입니다. 다시 시도해주세요.');
      }
      if (message.includes('틀립니다')) {
        setIsError(true);
        messageApi.open({
          type: 'error',
          content: '이메일이나 비밀번호가 틀립니다.'
        });
      }
      if (message.includes('에러가')) {
        setIsError(true);
        messageApi.open({
          type: 'error',
          content: '에러가 발생했습니다. 다시 시도해주세요.'
        });
      }
    } else {
      if (saveEmailCheckboxRef.current!.checked) {
        localStorage.setItem('saved_email', emailValue);
      }
      router.refresh();
      router.replace(path);
      messageApi.open({
        type: 'success',
        content: '로그인 완료!'
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center h-full bg-gray-200 rounded-lg overflow-hidden">
        <form
          onSubmit={signInHandler}
          className="flex flex-col gap-3 shadow-lg shadow-gray-300 w-96 p-9 items-center bg-slate-50 "
        >
          <div className="flex flex-col gap-3 mb-4 text-center">
            <h1 className="text-xl font-semibold">무비바바</h1>
            <h2 className="text-lg ">로그인</h2>
          </div>
          <input
            className="custom_input"
            type="email"
            name="email"
            placeholder="이메일 주소"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            required
          />
          <div ref={outerDivRef} className="outer_div">
            <input
              className="inner_input"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="비밀번호"
              value={passwordValue}
              onChange={(e) => handlePasswordChange(e)}
              onFocus={() => {
                outerDivRef.current?.classList.add('outer_div_on_focus');
              }}
              onBlur={() => {
                outerDivRef.current?.classList.remove('outer_div_on_focus');
              }}
              onInvalid={() => {
                outerDivRef.current?.classList.add('outer_div_on_invalid');
              }}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <SVG_HidePassword className="w-6 h-6 opacity-30 hover:opacity-80 transform ease-in-out duration-200" />
              ) : (
                <SVG_ShowPassword className="w-6 h-6 opacity-30 hover:opacity-80 transform ease-in-out duration-200" />
              )}
            </button>
          </div>

          <div className="flex justify-end w-full text-sm gap-2">
            <input ref={saveEmailCheckboxRef} type="checkbox" name="save-id" id="save-id" />
            <label htmlFor="save-id">이메일 저장 </label>
          </div>
          {showCaptcha && (
            <HCaptcha
              sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
              // sitekey="10000000-ffff-ffff-ffff-000000000001"
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
          <div className="flex justify-center gap-2 items-center">
            <button className="text-sm" onClick={() => router.replace('?sign-up=true')}>
              회원가입
            </button>
            <div className="h-3 border-r-2 border-gray-300"></div>
            <button
              type="button"
              onClick={() => router.replace('?sign-in=true&forgot-password=true')}
              className="text-sm"
            >
              비밀번호 찾기
            </button>
          </div>

          {/* <span>{message}</span> */}
          <SocialButtons />
        </form>
      </div>
    </>
  );
};

export default SignIn;
