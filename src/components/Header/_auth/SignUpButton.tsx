'use client';

import NewSignUp from '@/components/Auth/SignUp/NewSignUp';
import { Modal } from 'antd';
import { useState } from 'react';

const SignUpButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="text-sm sm:text-base pt-[2px] hover:font-semibold animate-200"
      >
        회원가입
      </button>
      <Modal centered open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        <NewSignUp />
      </Modal>
    </>
  );
};

export default SignUpButton;
