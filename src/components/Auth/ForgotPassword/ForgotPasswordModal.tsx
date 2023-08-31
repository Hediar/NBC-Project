'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import Modal from '@/components/common/Modal';
import useToggleForgotPassword from '@/store/toggleForgotPassword';
import useToggleSignInModal from '@/store/toggleSignInModal';
import supabase from '@/supabase/config';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import axios from 'axios';
import React, { useRef, useState } from 'react';

const ForgotPasswordModal = () => {
  const { isForgotPasswordOpen, setIsForgotPasswordOpen } = useToggleForgotPassword();
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();
  const emailRef = useRef<string>('');
  const [captchaToken, setCaptchaToken] = useState<any>();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsClicked(true);
    e.preventDefault();
    const emailValue = emailRef.current;
    const { data: providerData } = await supabase.from('users').select('provider').eq('email', emailValue).single();
    if (providerData?.provider !== 'email') {
      setIsClicked(false);
      alert('소셜 로그인 사용자는 비밀번호 찾기를 사용할 수 없습니다.\n소셜 로그인은 비밀번호를 사용하지 않습니다.');
      setIsForgotPasswordOpen(isForgotPasswordOpen);
      return;
    }

    const {
      data: { data, error }
    } = await axios.post('/auth/profile/forgot-password', { email: emailValue, captchaToken });

    if (error) {
      console.log(error);
      if (error.message.includes('captcha')) {
        setIsClicked(false);
        alert('Captcha오류입니다. 다시 시도해주세요.');
        return;
      }
      if (error.message.includes('requires an email')) {
        setIsClicked(false);
        alert('이메일을 작성해주세요.');
        return;
      }
      setIsClicked(false);
      alert('에러가 발생했습니다. 다시 시도해주세요.');
      return;
    } else {
      alert('해당 계정의 수신함을 확인해주세요.');
      setIsClicked(false);
      setIsSignInModalOpen(isSignInModalOpen);
      setIsForgotPasswordOpen(isForgotPasswordOpen);
    }
  };

  const cancelHandler = () => {
    setIsForgotPasswordOpen(isForgotPasswordOpen);
  };
  return (
    <Modal>
      <form className="p-8 flex flex-col gap-4 bg-white rounded-md" onSubmit={(e) => submitHandler(e)}>
        <h1 className="text-center font-semibold text-xl">비밀번호 찾기</h1>
        <p className="text-center text-sm">등록하신 이메일을 입력해주세요.</p>
        <input className="custom_input" type="email" onChange={(e) => (emailRef.current = e.target.value)} />
        <HCaptcha
          // sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
          sitekey="10000000-ffff-ffff-ffff-000000000001"
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
  );
};

export default ForgotPasswordModal;
