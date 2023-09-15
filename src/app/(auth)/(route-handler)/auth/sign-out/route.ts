import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  await supabase.auth.signOut();

  return NextResponse.json({ message: '로그아웃 성공' });
};
