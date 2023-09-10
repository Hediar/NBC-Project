'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import Logo from '@/styles/svg/Logo';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Checkbox, Input, Modal, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ForgotPasswordModal from '../ForgotPassword/ForgotPasswordModal';
import useToggleForgotPassword from '@/store/forgotPasswordToggle';
import SocialButtons from '../SocialButtons';

interface Data {
  error: boolean;
  message: string;
}

const NewSignnIn = () => {
  const router = useRouter();

  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const captchaRef = useRef<any>(null);

  const [shouldDisable, setShouldDisable] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { isForgotPasswordOpen, setIsForgotPasswordOpen } = useToggleForgotPassword();
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('saved_email');
    if (savedEmail) {
      setCheckboxValue(true);
      setEmailValue(savedEmail);
    }
  }, []);

  useEffect(() => {
    if (passwordValue.length < 6) {
      setShouldDisable(true);
    }
    if (emailValue.length > 6 && passwordValue.length > 6) {
      setShouldDisable(false);
    }
  }, [emailValue, passwordValue]);

  useEffect(() => {
    const signInHandler = async () => {
      const formData = new FormData();
      formData.append('email', emailValue);
      formData.append('password', passwordValue);
      formData.append('captchaToken', captchaToken);

      const res = await fetch('/auth/sign-in', { method: 'post', body: formData });

      const { error, message } = (await res.json()) as Data;

      if (error) {
        if (message.includes('captcha 오류')) {
          messageApi.open({
            type: 'error',
            content: 'captcha오류입니다. 다시 시도해주세요.'
          });
          // setMessage('captcha오류입니다. 다시 시도해주세요.');
        }
        if (message.includes('틀립니다')) {
          messageApi.open({
            type: 'error',
            content: '이메일이나 비밀번호가 틀립니다.'
          });
        }
        if (message.includes('에러가')) {
          messageApi.open({
            type: 'error',
            content: '에러가 발생했습니다. 다시 시도해주세요.'
          });
        }
      } else {
        if (checkboxValue) {
          localStorage.setItem('saved_email', emailValue);
        }
        messageApi.open({
          type: 'success',
          content: '로그인 완료!'
        });
        setTimeout(() => {
          router.refresh();
        }, 1500);
      }
    };
    if (captchaToken) {
      signInHandler();
    }
  }, [captchaToken]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(passwordValue)) {
      return messageApi.open({
        type: 'error',
        content: '비밀번호는 최소 8자 이상이어야 하며, 최소 하나의 대문자, 소문자, 숫자가 포함되어야 합니다.',
        duration: 5
      });
    } else {
      captchaRef.current.execute();
    }
  };

  return (
    <>
      {contextHolder}
      {isClicked && <LoadingSpinner />}

      <form
        onSubmit={onSubmitHandler}
        className="py-[50px] w-full h-full relative flex flex-col items-center justify-center"
      >
        {!isForgotPasswordOpen && (
          <HCaptcha
            ref={captchaRef}
            sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
            size="invisible"
            onVerify={(token) => setCaptchaToken(token)}
            onError={() => captchaRef.current.reset()}
            onExpire={() => captchaRef.current.reset()}
          />
        )}
        <Logo className="mb-6 lg:hidden" />
        <Logo className="hidden mb-6 lg:block" width={250} height={100} />
        <h1 className="text-neutral-800 text-lg font-bold mb-4 lg:text-2xl animate-300">로그인</h1>
        <div className="w-full flex flex-col items-center gap-4 mb-4">
          <div className="w-[80%] max-w-[350px] flex flex-col gap-2">
            <label htmlFor="email" className="text-neutral-800 font-semibold">
              이메일
            </label>
            <Input
              type="email"
              className="py-2.5"
              placeholder="이메일을 입력하세요"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
            />
          </div>
          <div className="w-[80%] max-w-[350px] flex flex-col gap-2">
            <label htmlFor="password" className="text-neutral-800 font-semibold">
              비밀번호
            </label>
            <Input.Password
              className="py-2.5"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setPasswordValue(e.target.value)}
              value={passwordValue}
              required
            />
          </div>
        </div>

        <div className="w-[80%] max-w-[350px] flex justify-between text-sm gap-2 mb-4">
          <button type="button" onClick={() => setIsForgotPasswordOpen(true)} className="text-sm">
            비밀번호 찾기
          </button>
          <Modal
            footer={false}
            maskClosable={false}
            destroyOnClose={true}
            open={isForgotPasswordOpen}
            centered
            onCancel={() => setIsForgotPasswordOpen(false)}
          >
            <ForgotPasswordModal />
          </Modal>
          <div className="flex gap-1 items-center">
            <Checkbox onChange={(e) => setCheckboxValue(e.target.checked)}>이메일 저장</Checkbox>
          </div>
        </div>

        <button className="mb-5 w-[80%] max-w-[350px] custom_button" type="submit" disabled={shouldDisable}>
          로그인
        </button>

        <div className="w-[80%] max-w-[350px] flex gap-2 justify-center items-center mb-5">
          <div className="w-[25%] h-px bg-gray-200"></div>
          <span className="px-3 text-neutral-800 text-sm">간편 로그인</span>
          <div className="w-[25%] h-px bg-gray-200"></div>
        </div>
        <SocialButtons />
      </form>
    </>
  );
};

export default NewSignnIn;
