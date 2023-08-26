'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

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
    <div className="flex justify-evenly items-center w-full">
      <button
        className="py-2 px-3 shadow-sm shadow-slate-400 rounded-md bg-slate-200-500 text-sm"
        type="button"
        onClick={() => handleOAuthSignIn('google', { access_type: 'offline', prompt: 'consent' })}
      >
        Google
      </button>
      <button
        className="py-2 px-3 shadow-sm shadow-slate-400 rounded-md bg-slate-200-500 text-sm"
        type="button"
        onClick={() => handleOAuthSignIn('kakao')}
      >
        kakao
      </button>
    </div>
  );
};

export default SocialButtons;
