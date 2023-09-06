import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force=dynamic';

export const GET = async (req: Request) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.reauthenticate();

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message, data: null }), {
      status: 500,
      statusText: 'Internal Server Error'
    });
  } else {
    return new NextResponse(JSON.stringify({ error: null, data }), {
      status: 200,
      statusText: 'OK'
    });
  }
};
