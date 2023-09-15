import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { name, userId } = await request.json();

  const { data, error } = await supabase.from('users').update({ name: name }).eq('id', userId).select('name');

  if (error) {
    return NextResponse.json({ error: error.message, data: null });
  }

  return NextResponse.json({ data, error: null });
};
