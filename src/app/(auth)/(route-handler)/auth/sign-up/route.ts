import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const captchaToken = String(formData.get('captchaToken'));

  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${requestUrl.origin}/auth/callback`, captchaToken: captchaToken }
  });

  if (error) {
    console.log(error);
    if (error.message === 'User already registered') {
      return NextResponse.json({ error: true, message: 'User already registered.' });
    }

    if (error.message.includes('captcha protection: request disallowed')) {
      return NextResponse.json({ error: true, message: 'captcha 오류.' });
    }
    // console.log(error.cause);
    // console.log(error.message);
    // console.log(error.name);
    // console.log(error.stack);
    // console.log(error.status);
    return NextResponse.redirect(`${requestUrl.origin}/sign-up?error=에러가 발생했습니다.`, { status: 301 });
  }

  return NextResponse.json({ error: false, message: '회원가입 성공' });
};
