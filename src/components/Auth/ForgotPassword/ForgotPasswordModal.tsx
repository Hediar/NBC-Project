'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import supabase from '@/supabase/config';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import useToggleForgotPassword from '@/store/forgotPasswordToggle';

const ForgotPasswordModal = () => {
  const router = useRouter();
  const path = usePathname() ?? '';
  const [emailValue, setEmailValue] = useState<string>('');
  const captchaRef = useRef<any>(null);
  const [captchaToken, setCaptchaToken] = useState<any>();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { setIsForgotPasswordOpen } = useToggleForgotPassword();

  useEffect(() => {
    const executeSubmit = async () => {
      setIsClicked(true);

      const { data: providerData } = await supabase.from('users').select('provider').eq('email', emailValue).single();
      if (providerData?.provider === 'google' || providerData?.provider === 'kakao') {
        setIsClicked(false);
        messageApi.open({
          type: 'error',
          content:
            '소셜 로그인 사용자는 비밀번호 찾기를 사용할 수 없습니다.\n소셜 로그인은 비밀번호를 사용하지 않습니다.'
        });
        setTimeout(() => {
          router.replace('?sign-in=true');
        }, 3000);
        return;
      }

      const {
        data: { data, error }
      } = await axios.post('/auth/profile/forgot-password', { email: emailValue, captchaToken });

      if (error) {
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
          type: 'success',
          content: '해당 계정의 수신함을 확인해주세요.'
        });
        setIsClicked(false);
        setTimeout(() => {
          setIsForgotPasswordOpen(false);
        }, 2000);
      }
    };
    if (captchaToken) {
      executeSubmit();
    }
  }, [captchaToken]);

  const submitHandler = async () => {
    if (emailValue === '') {
      return messageApi.open({
        type: 'error',
        content: '이메일을 입력해주세요.'
      });
    } else {
      captchaRef.current.execute();
    }
  };

  const cancelHandler = () => {
    setIsForgotPasswordOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className="p-8 flex flex-col gap-4 bg-white rounded-md">
        <h1 className="text-center font-semibold text-xl">비밀번호 찾기</h1>
        <p className="text-center text-base">등록하신 이메일을 입력해주세요.</p>
        <input className="custom_input" type="email" onChange={(e) => setEmailValue(e.target.value)} />
        <HCaptcha
          ref={captchaRef}
          sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
          size="invisible"
          onVerify={(token) => setCaptchaToken(token)}
          onError={() => captchaRef.current.reset()}
          onExpire={() => captchaRef.current.reset()}
        />
        <div className="flex gap-2 w-full">
          <button onClick={submitHandler} className="custom_button">
            확인
          </button>
          <button onClick={cancelHandler} type="button" className="custom_button_cancel">
            취소
          </button>
        </div>
        {isClicked && <LoadingSpinner />}
      </div>
    </>
  );
};

export default ForgotPasswordModal;
