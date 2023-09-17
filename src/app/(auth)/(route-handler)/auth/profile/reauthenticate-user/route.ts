import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.reauthenticate();

  if (error) {
    return NextResponse.json({ error: error.message, data: null });
  } else {
    return NextResponse.json({ error: null, data });
  }
};
