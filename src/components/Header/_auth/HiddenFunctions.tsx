// forgot password 모달을 이 컴포넌트에 넣고 on off함.
// 이 컴포넌트는 헤드에 리턴값 없이 삽입되어 기능만 on
'use client';
import ForgotPasswordModal from '@/components/Auth/ForgotPassword/ForgotPasswordModal';
import useToggleForgotPassword from '@/store/toggleForgotPassword';
import React from 'react';

const HiddenFunctions = () => {
  const { isForgotPasswordOpen, setIsForgotPasswordOpen } = useToggleForgotPassword();
  return <>{isForgotPasswordOpen && <ForgotPasswordModal />}</>;
};

export default HiddenFunctions;
