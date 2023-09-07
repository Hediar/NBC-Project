import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const POST = async (req: Request) => {
  const { userId } = await req.json();

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data: isPublicData, error: isPublicError } = await supabase
    .from('watch_later')
    .select('isPublic')
    .eq('userid', userId)
    .single();

  if (isPublicError) {
    const { data: createNewRow } = await supabase
      .from('watch_later')
      .insert({ userid: userId, movies: [], isPublic: true })
      .select()
      .single();

    return new NextResponse(JSON.stringify({ error: null, data: createNewRow }), { status: 200, statusText: 'OK' });
  }

  return new NextResponse(JSON.stringify({ error: null, data: isPublicData }), { status: 200, statusText: 'OK' });
};
