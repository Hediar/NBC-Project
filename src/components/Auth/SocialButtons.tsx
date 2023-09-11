'use client';

import Google from '@/styles/svg/Google';
import Kakao from '@/styles/svg/Kakao';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const SocialButtons = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleOAuthSignIn = async (provider: 'google' | 'kakao', queryParams = {}) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${baseUrl}/oauth/callback`,
        queryParams
      }
    });
    router.refresh();
  };

  return (
    <div className="flex w-[80%] max-w-[350px] justify-center items-center gap-4">
      <div onClick={() => handleOAuthSignIn('kakao')}>
        <Kakao />
      </div>
      <div onClick={() => handleOAuthSignIn('google', { access_type: 'offline', prompt: 'consent' })}>
        <Google />
      </div>
    </div>
  );
};

export default SocialButtons;
