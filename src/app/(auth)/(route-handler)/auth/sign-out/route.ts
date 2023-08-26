import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
  const baseUrl = new URL(request.url);
  const supabase = createRouteHandlerClient<Database>({ cookies });
  await supabase.auth.signOut();

  return NextResponse.redirect(`${baseUrl.origin}`, { status: 301 });
};
