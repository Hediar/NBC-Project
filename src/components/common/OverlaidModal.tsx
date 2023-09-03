'use client';

import React, { useEffect, useRef } from 'react';
import Modal from './Modal';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const OverlaidModal = ({ children }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const path = usePathname() ?? '';
  const redirectUrl = path;

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
            router.replace(redirectUrl);
          }, 200);
        }
      }}
      className="opacity-0 -mt-20 fixed w-screen h-screen bg-gray-700 bg-opacity-50 z-40 transform ease-in-out duration-200 "
    >
      <Modal>{children}</Modal>
    </div>
  );
};

export default OverlaidModal;
