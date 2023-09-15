import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// export const runtime = 'edge';

export const POST = async (req: Request) => {
  const { nonce, password } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.updateUser({ password, nonce });

  if (error) {
    return NextResponse.json({ error: error.message, data: null });
  } else {
    return NextResponse.json({ error: null, data });
  }
};
