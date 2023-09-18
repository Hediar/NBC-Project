'use client';

import OverlaidModal from '@/components/common/OverlaidModal';
import { useRouter, useSearchParams } from 'next/navigation';
import SignIn from '@/components/Auth/SignIn/SignIn';
import { Modal } from 'antd';
import useToggleSignInModal from '@/store/toggleSignInModal';
import { useEffect } from 'react';
import useSaveCurrentURL from '@/hooks/saveCurrentURL';

const ModalControlCentre = () => {
  const searchParams = useSearchParams();
  const url = useSaveCurrentURL();
  const isSignInOpen = !!searchParams.get('sign-in');
  const router = useRouter();
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();

  const scrollTo = searchParams.get('scrollTo');

  useEffect(() => {
    if (isSignInOpen) {
      setIsSignInModalOpen(true);
    }
  }, [isSignInOpen]);

  return (
    <>
      <Modal
        centered
        open={isSignInModalOpen}
        footer={null}
        onCancel={() => {
          setIsSignInModalOpen(false);
        }}
        afterClose={() => router.replace(url)}
      >
        <SignIn />
      </Modal>
    </>
  );
};

export default ModalControlCentre;
