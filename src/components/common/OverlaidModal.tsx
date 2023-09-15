'use client';

import React, { Suspense, useEffect, useRef } from 'react';
import Modal from './Modal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  children: React.ReactNode;
  scrollTo?: string;
}

const OverlaidModal = ({ children, scrollTo = '' }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const path = usePathname() ?? '';
  const redirectUrl = path;
  const isOnSettingsMyAccount = useSearchParams().get('my-account') ?? '';

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
            if (isOnSettingsMyAccount) {
              router.replace(redirectUrl + '?my-account=true');
            } else {
              router.replace(redirectUrl + `#${scrollTo}`);
            }
          }, 200);
        }
      }}
      className="opacity-0 -mt-20 fixed w-screen h-screen bg-gray-700 bg-opacity-50 z-40 transform ease-in-out duration-200 "
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Modal overlayRef={overlayRef} scrollTo={scrollTo}>
          {children}
        </Modal>
      </Suspense>
    </div>
  );
};

export default OverlaidModal;
