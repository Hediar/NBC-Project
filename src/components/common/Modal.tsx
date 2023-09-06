'use client';

import { Close } from '@/styles/icons/Icons32';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  overlayRef?: React.RefObject<HTMLDivElement>;
  scrollTo?: string;
}
const Modal = ({ children, overlayRef, scrollTo }: Props) => {
  const router = useRouter();
  const path = usePathname() ?? '';
  const redirectUrl = path;
  const isOnSettingsMyAccount = useSearchParams().get('my-account') ?? '';

  return (
    <div className="overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md shadow-gray-200 z-50 bg-white max-w-screen-lg max-h-[90vh] box-border rounded-lg">
      <Close
        className="absolute top-2 right-2"
        width={24}
        height={24}
        fill="#888"
        onMouseDown={() => {
          if (overlayRef) {
            overlayRef.current!.style.opacity = '0';
          }
          setTimeout(() => {
            if (isOnSettingsMyAccount) {
              router.replace(redirectUrl + '?my-account=true');
            } else {
              router.replace(redirectUrl + `#${scrollTo}`);
            }
          }, 200);
        }}
      />
      {children}
    </div>
  );
};

export default Modal;
