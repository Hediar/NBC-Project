import saveUserProviderWithEmail from '@/api/supabase/saveUserProviderWithEmail';
import authApi from '@/util/supabase/auth/auth';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const GET = async () => {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { session } = await authApi.get('session');
    if (!session) return { userData: null };
    const signedInUserId = session!.user.id;

    const { data: userData } = await supabase.from('users').select().eq('id', signedInUserId).single();

    return NextResponse.json({ userData });
  } catch (error) {
    return NextResponse.json({ userData: null });
  }
};

// try {
//   const supabase = createRouteHandlerClient({ cookies });

//   const { userData } = await authApi.get('userData');

//   if (!userData) {
//     return NextResponse.json({ userData: null });
//   } else {
//     await saveUserProviderWithEmail();
//     return NextResponse.json({ userData });
//   }
// } catch (error) {
//   return NextResponse.json({ userData: null });
// }
