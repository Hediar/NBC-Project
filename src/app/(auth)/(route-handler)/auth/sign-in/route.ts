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

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken: captchaToken }
  });
  console.log(error);
  if (error) {
    console.log(error);

    if (error.message.includes('captcha verification') || error.message.includes('captcha')) {
      console.log(true);
      return NextResponse.json({ error: true, message: 'captcha 오류.' });
    }
    if (error.message.includes('Invalid login credentials')) {
      console.log(true);
      return NextResponse.json({ error: true, message: '이메일이나 비밀번호가 틀립니다.' });
    }
    console.log(error.cause);
    console.log(error.message);
    console.log(error.name);
    console.log(error.stack);
    console.log(error.status);
    return NextResponse.json({ error: true, message: '에러가 발생했습니다' });
  }

  // if (error) {
  //   return NextResponse.redirect(`${requestUrl.origin}/sign-in?error=로그인 정보가 올바르지 않습니다.`, {
  //     status: 301
  //   });
  // }
  return NextResponse.json({ error: false, message: '로그인 성공' });
  // return NextResponse.redirect(requestUrl.origin, { status: 301 });
};
