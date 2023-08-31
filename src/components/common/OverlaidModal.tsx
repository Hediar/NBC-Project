'use client';

import React, { useRef } from 'react';
import Modal from './Modal';

interface Props {
  children: React.ReactNode;
  toggle: (param: boolean) => void;
  value: boolean;
  optional_toggle?: (param: boolean) => void;
  optional_value?: boolean;
}

const OverlaidModal = ({ children, toggle, value, optional_toggle, optional_value }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          overlayRef.current.style.opacity = '0';
          setTimeout(() => {
            toggle(value);
          }, 200);
          if (optional_toggle && optional_value) {
            optional_toggle(optional_value);
          }
        }
      }}
      className="-mt-20 fixed w-screen h-screen bg-gray-700 bg-opacity-50 z-40 transform ease-in-out duration-200 "
    >
      <Modal>{children}</Modal>
    </div>
  );
};

export default OverlaidModal;
