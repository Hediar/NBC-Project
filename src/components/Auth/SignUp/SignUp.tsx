/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Close } from '@/styles/icons/Icons32';
import Google from '@/styles/svg/Google';
import Kakao from '@/styles/svg/Kakao';
import Logo from '@/styles/svg/Logo';
import SVG_HidePassword from '@/styles/svg/SVG_HidePassword';
import SVG_ShowPassword from '@/styles/svg/SVG_ShowPassword';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Modal, message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const NewSignUp = () => {
  const router = useRouter();
  const path = usePathname();

  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const captchaRef = useRef<any>(null);

  const [shouldDisable, setShouldDisable] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const outerDivRef = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState(false);

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
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(passwordValue)) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 하며, 최소 하나의 대문자, 소문자, 숫자가 포함되어야 합니다.');
      return;
    } else {
      setPasswordError(null);
      await captchaRef.current.execute();
    }
  };

  return (
    <>
      {contextHolder}
      {isClicked && <LoadingSpinner />}
      {/* <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            router.push(path);
          }
        }}
        className="z-50 flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-[#44444444]"
      > */}
      <Modal open afterClose={() => router.replace(path)} footer={null} destroyOnClose={true} maskClosable={true}>
        <div className="flex justify-center items-center w-full">
          <form
            onSubmit={onSubmitHandler}
            className=" animate-300 sm:w-[500px] bg-white rounded-2xl py-[50px] border border-[#ccc] w-full h-full relative flex flex-col items-center justify-center"
            autoComplete="off"
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
                  className="custom_input"
                  type="email"
                  placeholder="이메일 주소"
                  autoComplete="on"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  required
                />
              </div>
              <div className="w-[80%] max-w-[350px] flex flex-col gap-2">
                <label htmlFor="password" className="text-neutral-800 font-semibold">
                  비밀번호
                </label>
                <div ref={outerDivRef} className="outer_div">
                  <input
                    className="inner_input"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="비밀번호"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    onFocus={() => {
                      outerDivRef.current?.classList.add('outer_div_on_focus');
                    }}
                    onBlur={() => {
                      outerDivRef.current?.classList.remove('outer_div_on_focus');
                    }}
                    onInvalid={() => {
                      outerDivRef.current?.classList.add('outer_div_on_invalid');
                    }}
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
              <Kakao />
              <Google />
            </div>
          </form>
        </div>
      </Modal>
      {/* </div> */}
    </>
  );
};

export default NewSignUp;
