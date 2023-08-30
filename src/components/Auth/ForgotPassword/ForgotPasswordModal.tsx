'use client';

import Modal from '@/components/common/Modal';
import useToggleForgotPassword from '@/store/toggleForgotPassword';
import useToggleSignInModal from '@/store/toggleSignInModal';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import axios from 'axios';
import React, { useRef, useState } from 'react';

const ForgotPasswordModal = () => {
  const { isForgotPasswordOpen, setIsForgotPasswordOpen } = useToggleForgotPassword();
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();
  const emailRef = useRef<string>('');
  const [captchaToken, setCaptchaToken] = useState<any>();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValue = emailRef.current;
    const {
      data: { data, error }
    } = await axios.post('/auth/profile/forgot-password', { email: emailValue, captchaToken });
    console.log(data, error);
    if (error) {
      console.log(error);
      alert('에러가 발생했습니다. 다시 시도해주세요.');
    } else {
      alert('해당 계정의 수신함을 확인해주세요.');
      setIsSignInModalOpen(isSignInModalOpen);
      setIsForgotPasswordOpen(isForgotPasswordOpen);
    }
  };

  const cancelHandler = () => {
    setIsForgotPasswordOpen(isForgotPasswordOpen);
  };
  return (
    <Modal>
      <form className="p-8 flex flex-col gap-4 bg-white" onSubmit={(e) => submitHandler(e)}>
        <h1 className="text-center font-semibold text-xl">비밀번호 찾기</h1>
        <p>등록하신 이메일을 입력해주세요.</p>
        <input className="border border-gray-700" type="email" onChange={(e) => (emailRef.current = e.target.value)} />
        <HCaptcha
          // sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
          sitekey="10000000-ffff-ffff-ffff-000000000001"
          onVerify={(token) => {
            setCaptchaToken(token);
          }}
        />
        <div className="flex gap-2 w-full">
          <button type="submit" className="border border-gray-700 w-1/2 text-sm text-white bg-gray-700 py-1 px-2">
            확인
          </button>
          <button
            onClick={cancelHandler}
            type="button"
            className="border border-gray-700 w-1/2 text-sm text-white bg-gray-700 py-1 px-2"
          >
            취소
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ForgotPasswordModal;
