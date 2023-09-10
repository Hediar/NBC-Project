'use client';

import NewSignnIn from '@/components/Auth/SignIn/NewSignnIn';
import { Modal } from 'antd';
import React, { useState } from 'react';

const SignInButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="text-sm sm:text-base pt-[2px] hover:font-semibold animate-200"
      >
        로그인
      </button>

      <Modal centered open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        <NewSignnIn />
      </Modal>
    </>
  );
};

export default SignInButton;
