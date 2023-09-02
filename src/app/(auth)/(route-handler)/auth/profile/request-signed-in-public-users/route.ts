import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const POST = async (req: Request) => {
  const { id } = await req.json();

  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.from('users').select().eq('id', id).single();

  if (error) {
    return new NextResponse(JSON.stringify({ isError: true, isSuccess: false, error: error.message, data: null }), {
      status: 404,
      statusText: 'Not Found'
    });
  }

  return new NextResponse(JSON.stringify({ isError: false, isSuccess: true, error: null, data }), {
    status: 200,
    statusText: 'OK'
  });
};
