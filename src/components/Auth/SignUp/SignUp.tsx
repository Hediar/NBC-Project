/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import isUsernameAvailable from '@/api/generateUsername/isUsernameAvailable';
import useUserInfoStore from '@/store/saveCurrentUserData';
import useToggleSignUpModal from '@/store/toggleSignUpModal';
import useToggleSignUpWIthEmailModal from '@/store/toggleSignUpWIthEmailModal';
import Logo from '@/styles/svg/Logo';
import authApi from '@/util/supabase/auth/auth';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const SignUp = () => {
  const router = useRouter();

  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [password2Value, setPassword2Value] = useState<string>('');
  const [usernameValue, setUsernameValue] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const captchaRef = useRef<any>(null);

  const [shouldDisable, setShouldDisable] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { isModalOpen, setIsModalOpen } = useToggleSignUpModal();
  const { setIsSignUpWIthEmailModalOpen } = useToggleSignUpWIthEmailModal();

  const { saveUserInfo } = useUserInfoStore();

  useEffect(() => {
    if (passwordValue.length < 6) {
      setShouldDisable(true);
    }
    if (emailValue.length > 0 && passwordValue.length >= 8 && password2Value.length >= 8 && usernameValue.length >= 2) {
      setShouldDisable(false);
    }
  }, [emailValue, passwordValue, password2Value, usernameValue]);

  useEffect(() => {
    const signupHandler = async () => {
      const formData = new FormData();
      formData.append('email', emailValue);
      formData.append('password', passwordValue);
      formData.append('username', usernameValue);
      formData.append('captchaToken', captchaToken);

      setIsClicked(true);

      const res = await fetch('/auth/sign-up', { method: 'post', body: formData });
      const data = await res.json();
      if (data.error) {
        if (data.message === 'User already registered.') {
          setIsClicked(false);
          return messageApi.open({
            type: 'warning',
            content: '이미 등록된 이메일입니다.'
          });
        }
        if (data.message.includes('captcha 오류')) {
          setIsClicked(false);
          return messageApi.open({
            type: 'error',
            content: 'captcha오류입니다. 다시 시도해주세요.'
          });
        }
        router.refresh();
      } else {
        messageApi.open({
          type: 'success',
          content: '회원가입 완료!'
        });
        const { userData } = await (await fetch('/auth/get-userdata')).json();

        setTimeout(() => {
          saveUserInfo(userData);
          setIsClicked(false);
          setIsModalOpen(false);
          setIsSignUpWIthEmailModalOpen(false);
        }, 1000);
      }
    };
    if (captchaToken) {
      signupHandler();
    }
  }, [captchaToken]);

  const onSubmitHandler = async () => {
    const supabase = createClientComponentClient();
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
      setIsClicked(false);
      return messageApi.open({
        type: 'error',
        content: '올바른 이메일 형식이 아닙니다.',
        duration: 3
      });
    } else if (passwordValue !== password2Value) {
      setIsClicked(false);
      return messageApi.open({
        type: 'error',
        content: '비밀번호가 일치하지 않습니다.',
        duration: 3
      });
    } else if (!/^[a-zA-Z가-힣\s0-9]+$/.test(usernameValue)) {
      setIsClicked(false);
      return messageApi.open({
        type: 'error',
        content: '닉네임은 한글과 알파벳, 숫자 그리고 띄어쓰기가 가능합니다. 특수문자는 허용되지 않습니다.',
        duration: 5
      });
    } else if (!(await isUsernameAvailable(usernameValue, supabase))) {
      setIsClicked(false);
      return messageApi.open({
        type: 'warning',
        content: '이미 등록된 닉네임입니다.'
      });
    } else {
      setIsClicked(true);
      await captchaRef.current.execute();
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center w-full">
        <form className="pt-[50px] pb-[70px] w-full h-full relative flex flex-col items-center justify-center">
          <HCaptcha
            ref={captchaRef}
            sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
            size="invisible"
            onVerify={(token) => setCaptchaToken(token)}
            onError={() => captchaRef.current.reset()}
            onExpire={() => captchaRef.current.reset()}
            onClose={() => setIsClicked(false)}
          />

          <Logo className="mb-6 lg:hidden" />
          <Logo className="hidden mb-6 lg:block" width={250} height={100} />
          <h1 className="text-neutral-800 text-lg font-bold mb-4 lg:text-2xl ">회원가입</h1>
          <div className="w-full flex flex-col items-center gap-4">
            <div className="w-[80%] max-w-[350px] flex flex-col gap-2">
              <label htmlFor="email" className="text-neutral-800 font-semibold">
                이메일
              </label>
              <Input
                name="email"
                className="py-2 sm:py-2.5"
                type="email"
                placeholder="이메일을 입력하세요"
                autoComplete="on"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                required
              />
            </div>

            <div className="w-[80%] max-w-[350px] flex flex-col gap-2">
              <label htmlFor="password" className="text-neutral-800 font-semibold">
                비밀번호 <span className="text-sm font-normal text-gray-500">(8자리 이상)</span>
              </label>
              <Input.Password
                className="py-2 sm:py-2.5"
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => setPasswordValue(e.target.value)}
                autoComplete="new-password"
                value={passwordValue}
                maxLength={21}
                minLength={8}
                required
              />
            </div>

            <div className="w-[80%] max-w-[350px] flex flex-col gap-2">
              <label htmlFor="password" className="text-neutral-800 font-semibold">
                비밀번호 확인
              </label>
              <Input.Password
                className="py-2 sm:py-2.5"
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => setPassword2Value(e.target.value)}
                value={password2Value}
                autoComplete="new-password"
                maxLength={21}
                minLength={8}
                required
              />
            </div>

            <div className="w-[80%] max-w-[350px] flex flex-col gap-2">
              <label htmlFor="password" className="text-neutral-800 font-semibold">
                닉네임 <span className="text-sm font-normal text-gray-500">(2자리 이상 15자리 이하)</span>
              </label>
              <Input
                className="py-2 sm:py-2.5"
                placeholder="사용하실 닉네임을 입력하세요"
                onChange={(e) => setUsernameValue(e.target.value)}
                value={usernameValue}
                maxLength={15}
                minLength={2}
                required
              />
            </div>
            <Button
              className="mt-3 w-[80%] max-w-[350px] h-full p-2.5 bg-GreyScaleBlack"
              disabled={shouldDisable}
              loading={isClicked}
              type="primary"
              onClick={onSubmitHandler}
            >
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
