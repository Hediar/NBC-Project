'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

const SocialButtons = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const supabase = createClientComponentClient<Database>();

  const handleOAuthSignIn = async (provider: 'google' | 'kakao', queryParams = {}) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${baseUrl}/oauth/callback`,
        queryParams
      }
    });
  };

  return (
    <>
      <div className="w-full flex items-center justify-center gap-3">
        <div className="w-1/3 border-b-2 border-gray-300"></div>
        <p className="text-[0.95rem] text-gray-600">간편 로그인</p>
        <div className="w-1/3 border-b-2 border-gray-300"></div>
      </div>
      <div className="flex justify-evenly items-center w-full">
        <Image
          onClick={() => handleOAuthSignIn('google', { access_type: 'offline', prompt: 'consent' })}
          className="bg-white p-1 rounded-full bg-slate-200-500 text-sm cursor-pointer"
          src="/google.png"
          alt="google-icon"
          width={50}
          height={50}
        />
        <Image
          onClick={() => handleOAuthSignIn('kakao')}
          className="p-1 rounded-md bg-slate-200-500 text-sm cursor-pointer"
          src="/kakao.png"
          alt="kakao-icon"
          width={50}
          height={50}
        />
      </div>
    </>
  );
};

export default SocialButtons;
