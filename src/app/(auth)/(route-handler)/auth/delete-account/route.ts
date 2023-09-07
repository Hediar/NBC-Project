import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const POST = async () => {
  const supabase = createRouteHandlerClient(
    { cookies },
    { supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey: process.env.SUPABASE_SECRET_KEY! }
  );

  const { data: userData, error: userDataError } = await supabase.auth.getUser();
  const userId = userData.user?.id as string;

  if (userDataError) {
    return NextResponse.json({ data: null, error: userDataError.message });
  }

  const { data: deleteUserData, error: deleteUserError } = await supabase.auth.admin.deleteUser(userId);

  if (deleteUserError) {
    // console.log(deleteUserError);
    return NextResponse.json({ data: null, error: deleteUserError.message });
  }

  const { error } = await supabase.auth.signOut({ scope: 'global' });
  if (error) {
    console.log(error);
  }

  return NextResponse.json({ data: deleteUserData, error: null });
};
