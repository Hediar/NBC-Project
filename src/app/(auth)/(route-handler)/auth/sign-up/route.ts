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
  //
  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username }, emailRedirectTo: `${requestUrl.origin}/auth/callback` }
  });

  if (error) {
    console.log(error);
    return NextResponse.redirect(`${requestUrl.origin}/sign-up?error=에러가 발생했습니다.`, { status: 301 });
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/sign-up?success=이메일을 확인해주세요. 이 창은 닫으셔도 좋습니다. `,
    { status: 301 }
  );
};
