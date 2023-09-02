'use client';

import React, { useEffect, useRef } from 'react';
import Modal from './Modal';

interface Props {
  children: React.ReactNode;
  toggle: (param: boolean, x?: any) => void;
  optional_toggle?: (param: boolean) => void;
}

const OverlaidModal = ({ children, toggle, optional_toggle }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      overlayRef.current!.style.opacity = '1';
    }, 0);
  }, []);

  return (
    <div
      ref={overlayRef}
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) {
          overlayRef.current.style.opacity = '0';
          setTimeout(() => {
            toggle(false);
          }, 200);
          // optional_toggle && optional_value 사용은 로그인 모달에서
          // 비밀번호 찾기 모달이 켜져있는 경우 같이 없애려는 목적
          if (optional_toggle) {
            optional_toggle(false);
          }
        }
      }}
      className="opacity-0 -mt-20 fixed w-screen h-screen bg-gray-700 bg-opacity-50 z-40 transform ease-in-out duration-200 "
    >
      <Modal>{children}</Modal>
    </div>
  );
};

export default OverlaidModal;
