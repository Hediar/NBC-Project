import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const username = String(formData.get('username'));
  const captchaToken = String(formData.get('captchaToken'));
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      captchaToken: captchaToken,
      data: { username }
    }
  });

  if (error) {
    console.log(error);
    if (error.message === 'User already registered') {
      return NextResponse.json({ error: true, message: 'User already registered.' });
    }

    if (error.message.includes('captcha protection: request disallowed')) {
      return NextResponse.json({ error: true, message: 'captcha 오류.' });
    }

    return NextResponse.json({ isError: true, message: error.message });
  }

  return NextResponse.json({ error: false, message: '회원가입 성공' });
};
