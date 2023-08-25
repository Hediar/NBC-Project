import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient({ cookies });

  const data = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${requestUrl.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  });

  if (data.error) {
    console.log(data.error);
    return NextResponse.redirect(`${requestUrl.origin}/sign-up?error=에러가 발생했습니다.`, { status: 301 });
  }
  return NextResponse.redirect(requestUrl.origin);
};
