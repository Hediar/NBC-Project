import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const baseUrl = new URL(request.url).origin;
  const supabase = createRouteHandlerClient({ cookies });
  await supabase.auth.signOut();

  return NextResponse.redirect(`${baseUrl}/sign-in`, { status: 301 });
};
