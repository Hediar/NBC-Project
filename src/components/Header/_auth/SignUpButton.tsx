'use client';

import NewSignUp from '@/components/Auth/SignUp/NewSignUp';
import useToggleSignUpModal from '@/store/toggleSignUpModal';
import { Button, Modal } from 'antd';

const SignUpButton = () => {
  const { isModalOpen, setIsModalOpen } = useToggleSignUpModal();

  return (
    <>
      <Button
        type="text"
        loading={isModalOpen}
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="text-sm sm:text-base pt-[2px] hover:font-semibold animate-200"
      >
        회원가입
      </Button>
      <Modal
        centered
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <NewSignUp />
      </Modal>
    </>
  );
};

export default SignUpButton;
