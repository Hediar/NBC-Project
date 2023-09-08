/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Close } from '@/styles/icons/Icons32';
import Google from '@/styles/svg/Google';
import Kakao from '@/styles/svg/Kakao';
import Logo from '@/styles/svg/Logo';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import SocialButtons from '../SocialButtons';

const NewSignUp = () => {
  const router = useRouter();
  const path = usePathname();

  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const captchaRef = useRef<any>(null);

  const [shouldDisable, setShouldDisable] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (passwordValue.length < 6) {
      setShouldDisable(true);
    }
    if (emailValue.length > 6 && passwordValue.length > 6) {
      setShouldDisable(false);
    }
  }, [emailValue, passwordValue]);

  useEffect(() => {
    const signupHandler = async () => {
      const formData = new FormData();
      formData.append('email', emailValue);
      formData.append('password', passwordValue);
      formData.append('captchaToken', captchaToken);

      const res = await fetch('/auth/sign-up', { method: 'post', body: formData });
      const data = await res.json();
      if (data.error) {
        if (data.message === 'User already registered.') {
          messageApi.open({
            type: 'warning',
            content: '이미 등록된 이메일입니다.'
          });
        }
        if (data.message.includes('captcha 오류')) {
          messageApi.open({
            type: 'error',
            content: 'captcha오류입니다. 다시 시도해주세요.'
          });
        }

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
    if (captchaToken) {
      signupHandler();
    }
  }, [captchaToken]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await captchaRef.current.execute();
  };

  return (
    <>
      {contextHolder}
      {isClicked && <LoadingSpinner />}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            router.push(path);
          }
        }}
        className="z-50 flex justify-center items-center absolute top-0 left-0 w-full h-screen bg-[#44444444]"
      >
        <div className="animate-300 flex justify-center items-center sm:min-w-[400px] w-full sm:w-1/2 lg:w-[35%] xl:w-[30%]  ">
          <form
            onSubmit={onSubmitHandler}
            className=" bg-white rounded-2xl py-[50px] border border-[#ccc] w-full h-full relative flex flex-col items-center justify-center"
            style={{ maxWidth: '600px' }}
          >
            <HCaptcha
              ref={captchaRef}
              sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
              size="invisible"
              onVerify={(token) => setCaptchaToken(token)}
              onError={() => captchaRef.current.reset()}
              onExpire={() => captchaRef.current.reset()}
            />
            <Close
              onClick={() => {
                console.log(path);
                router.push(path);
              }}
              width={24}
              height={24}
              className="absolute top-3 right-3 cursor-pointer"
            />
            <Logo className="mb-6 lg:hidden" />
            <Logo className="hidden mb-6 lg:block" width={250} height={100} />
            <h1 className="text-neutral-800 text-lg font-bold mb-4 lg:text-2xl ">회원가입</h1>
            <div className="w-full flex flex-col items-center gap-4 mb-4">
              <div className="w-[80%] max-w-[350px] flex flex-col gap-2">
                <label htmlFor="email" className="text-neutral-800 font-semibold">
                  이메일
                </label>
                <input
                  name="email"
                  className="px-5 py-2 bg-white rounded-xl border border-zinc-300"
                  type="email"
                  placeholder="이메일 주소"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  required
                />
              </div>
              <div className="w-[80%] max-w-[350px] flex flex-col gap-2">
                <label htmlFor="email" className="text-neutral-800 font-semibold">
                  비밀번호
                </label>
                <input
                  name="email"
                  className="px-5 py-2 bg-white rounded-xl border border-zinc-300"
                  type="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  placeholder="비밀번호"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 mb-5">
              <button
                onClick={() => router.push(path)}
                className="px-3 py-0.5 text-neutral-800 border border-[#4b4e5b] rounded-lg"
                type="button"
              >
                취소
              </button>
              <button
                className="px-3 py-1 border border-[#4b4e5b] rounded-lg disabled:bg-[#d0d2d8] disabled:border-[#dbdde1] text-white bg-GreyScaleBlack"
                type="submit"
                disabled={shouldDisable}
              >
                회원가입
              </button>
            </div>
            <div className="w-[80%] max-w-[350px] flex gap-2 justify-center items-center mb-5">
              <div className="w-[25%] h-px bg-gray-200"></div>
              <span className="px-3 text-neutral-800 text-sm">간편 가입</span>
              <div className="w-[25%] h-px bg-gray-200"></div>
            </div>
            <div className="flex w-[80%] max-w-[350px] justify-center items-center gap-4">
              <SocialButtons />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewSignUp;
