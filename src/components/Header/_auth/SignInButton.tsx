'use client';

import NewSignnIn from '@/components/Auth/SignIn/NewSignnIn';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

const SignInButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <>
      <Button
        type="text"
        loading={isClicked}
        onClick={() => {
          setIsClicked(true);
          setIsModalOpen(!isModalOpen);
        }}
        className="text-sm sm:text-base pt-[2px] hover:font-semibold animate-200"
      >
        로그인
      </Button>

      <Modal
        centered
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsClicked(false);
          setIsModalOpen(false);
        }}
      >
        <NewSignnIn />
      </Modal>
    </>
  );
};

export default SignInButton;
