import { Modal } from 'antd';
import React from 'react';

interface Props {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const ContinueConfirmationModal = ({ open, onCancel, onOk }: Props) => {
  return (
    <>
      <Modal open={open} onCancel={onCancel} footer={null} width={400}>
        <p className="pt-[50px] pb-[30px] text-center text-neutral-800 text-xl font-normal leading-normal">
          작성 중이던 내용이 있습니다
          <br />
          이어서 작성하시겠습니까?
        </p>
        <div className="flex justify-center gap-3 mb-5">
          <button className="button-white" onClick={onCancel}>
            취소
          </button>
          <button className="button-dark" onClick={onOk}>
            확인
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ContinueConfirmationModal;
