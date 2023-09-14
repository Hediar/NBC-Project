/* eslint-disable @next/next/no-img-element */

'use client';

import SVG_Google from '@/styles/svg/Google_SVG';
import SVG_Kakao from '@/styles/svg/Kakao_SVG';
import Logo from '@/styles/svg/Logo';
import { Button, Divider, Modal } from 'antd';
import SignUp from './SignUp';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import useToggleSignUpWIthEmailModal from '@/store/toggleSignUpWIthEmailModal';

const NewSignUp = () => {
  const { isSignUpWIthEmailModalOpen, setIsSignUpWIthEmailModalOpen } = useToggleSignUpWIthEmailModal();
  const router = useRouter();

  const handleOAuthSignIn = async (provider: 'google' | 'kakao', queryParams = {}) => {
    const supabase = createClientComponentClient<Database>();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth/callback`,
        queryParams
      }
    });
    router.refresh();
  };

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <div className="py-[40px]  w-full h-full relative flex flex-col items-center justify-center">
          <div className="mb-6">
            <Logo className="lg:hidden" />
            <Logo className="hidden lg:block" width={250} height={100} />
          </div>
          <div className="mb-24">
            <h1 className="text-neutral-800 text-lg font-bold  lg:text-2xl ">반가워요👋</h1>
          </div>
          <div className="w-[80%] mb-20">
            <Button
              type="primary"
              className="text-base sm:text-lg bg-GreyScaleBlack w-full h-full py-2.5"
              onClick={() => setIsSignUpWIthEmailModalOpen(true)}
            >
              이메일로 가입하기
            </Button>
          </div>
          <div className="w-[80%] flex gap-2 justify-center items-center mb-10">
            <div className="w-[30%] h-px bg-gray-200"></div>
            <Divider type="horizontal" orientation="center" className="px-4 text-neutral-800 text-base font-normal">
              또는
            </Divider>
            <div className="w-[30%] h-px bg-gray-200"></div>
          </div>
          <div className="flex flex-col w-[80%] gap-3">
            <Button
              className="text-sm sm:text-base bg-[#f9e000] h-full py-2 flex justify-center items-center gap-4 border-0 animate-300 hover:scale-[1.02]"
              onClick={() => handleOAuthSignIn('kakao')}
            >
              <SVG_Kakao />
              <span>카카오로 가입하기</span>
            </Button>
            <Button
              className="text-sm sm:text-base border-0 ring-1 ring-[#dddddd] h-full py-2 flex justify-center items-center gap-4 animate-300 hover:scale-[1.02]"
              onClick={() => handleOAuthSignIn('google', { access_type: 'offline', prompt: 'consent' })}
            >
              <SVG_Google />
              <span>구글로 가입하기</span>
            </Button>
          </div>
        </div>
      </div>
      <Modal
        centered
        open={isSignUpWIthEmailModalOpen}
        footer={null}
        onCancel={() => setIsSignUpWIthEmailModalOpen(false)}
      >
        <SignUp />
      </Modal>
    </>
  );
};

export default NewSignUp;
