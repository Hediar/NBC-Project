'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const SocialButtons = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const supabase = createClientComponentClient();

  const googleOnClickHandler = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/oauth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
  };

  const kakaoOnClickHandler = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${baseUrl}/oauth/callback`
      }
    });
  };

  return (
    <div className="flex justify-evenly items-center w-full">
      <button
        className="py-2 px-3 shadow-sm shadow-slate-400 rounded-md bg-slate-200-500 text-sm"
        type="button"
        onClick={googleOnClickHandler}
      >
        Google
      </button>
      <button
        className="py-2 px-3 shadow-sm shadow-slate-400 rounded-md bg-slate-200-500 text-sm"
        type="button"
        onClick={kakaoOnClickHandler}
      >
        kakao
      </button>
    </div>
  );
};

export default SocialButtons;
