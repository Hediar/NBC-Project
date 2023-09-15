import saveUserProviderWithEmail from '@/api/supabase/saveUserProviderWithEmail';
import authApi from '@/util/supabase/auth/auth';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export const GET = async () => {
  const supabase = createRouteHandlerClient({ cookies });
  const { session } = await authApi.get('session');
  if (!session) return NextResponse.json({ userData: null });

  const signedInUserId = session.user.id;

  const { data: userData } = await supabase.from('users').select().eq('id', signedInUserId).single();

  await saveUserProviderWithEmail();
  return NextResponse.json({ userData });
};
