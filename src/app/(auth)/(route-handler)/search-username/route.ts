import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// export const runtime = 'edge';

export const POST = async (req: Request) => {
  const { pageUsername } = await req.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const { data: username } = await supabase.from('users').select('username').eq('username', pageUsername).single();
    if (!username) {
      return NextResponse.json({ userExist: false });
    } else {
      return NextResponse.json({ userExist: true });
    }
  } catch (error) {
    return NextResponse.json({ userExist: false });
  }
};
