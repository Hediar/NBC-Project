'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import supabase from '@/supabase/config';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { message } from 'antd';
import Modal from '@/components/common/Modal';

const ForgotPasswordModal = () => {
  const router = useRouter();
  const path = usePathname() ?? '';
  const emailRef = useRef<string>('');
  const [captchaToken, setCaptchaToken] = useState<any>();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsClicked(true);
    e.preventDefault();
    const emailValue = emailRef.current;
    const { data: providerData } = await supabase.from('users').select('provider').eq('email', emailValue).single();
    if (providerData?.provider === 'google' || providerData?.provider === 'kakao') {
      setIsClicked(false);
      messageApi.open({
        type: 'info',
        content: '소셜 로그인 사용자는 비밀번호 찾기를 사용할 수 없습니다.\n소셜 로그인은 비밀번호를 사용하지 않습니다.'
      });
      router.replace('?sign-in=true');
      return;
    }

    const {
      data: { data, error }
    } = await axios.post('/auth/profile/forgot-password', { email: emailValue, captchaToken });

    if (error) {
      // console.log(error);
      if (error.message.includes('captcha')) {
        setIsClicked(false);
        messageApi.open({
          type: 'error',
          content: 'Captcha오류입니다. 다시 시도해주세요.'
        });
        return;
      }
      if (error.message.includes('requires an email')) {
        setIsClicked(false);
        messageApi.open({
          type: 'warning',
          content: '이메일을 작성해주세요.'
        });
        return;
      }
      setIsClicked(false);
      messageApi.open({
        type: 'error',
        content: '에러가 발생했습니다. 다시 시도해주세요.'
      });
      return;
    } else {
      messageApi.open({
        type: 'info',
        content: '해당 계정의 수신함을 확인해주세요.'
      });
      setIsClicked(false);
      router.replace(path);
    }
  };

  const cancelHandler = () => {
    router.replace('?sign-in=true');
  };
  return (
    <>
      {contextHolder}
      <Modal>
        <form className="p-8 flex flex-col gap-4 bg-white rounded-md" onSubmit={(e) => submitHandler(e)}>
          <h1 className="text-center font-semibold text-xl">비밀번호 찾기</h1>
          <p className="text-center text-sm">등록하신 이메일을 입력해주세요.</p>
          <input className="custom_input" type="email" onChange={(e) => (emailRef.current = e.target.value)} />
          <HCaptcha
            sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
            onVerify={(token) => {
              setCaptchaToken(token);
            }}
          />
          <div className="flex gap-2 w-full">
            <button type="submit" className="custom_button">
              확인
            </button>
            <button onClick={cancelHandler} type="button" className="custom_button_cancel">
              취소
            </button>
          </div>
          {isClicked && <LoadingSpinner />}
        </form>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
