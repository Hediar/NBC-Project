import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const captchaToken = String(formData.get('captchaToken'));
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken: captchaToken }
  });

  if (error) {
    if (error.message.includes('captcha verification') || error.message.includes('captcha')) {
      return NextResponse.json({ error: true, message: 'captcha 오류.' });
    }
    if (error.message.includes('Invalid login credentials')) {
      return NextResponse.json({ error: true, message: '이메일이나 비밀번호가 틀립니다.' });
    }

    return NextResponse.json({ error: true, message: '에러가 발생했습니다' });
  }

  return NextResponse.json({ error: false, message: '로그인 성공' });
};
