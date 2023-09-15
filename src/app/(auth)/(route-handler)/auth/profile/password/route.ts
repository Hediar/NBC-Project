import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// export const runtime = 'edge';

export const POST = async (request: Request) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { password: newPassword, nonce } = await request.json();

  if (!nonce) {
    const { data: reauthenticateData, error: reauthenticateDataError } = await supabase.auth.reauthenticate();
    if (reauthenticateDataError) {
      // console.log(reauthenticateDataError);
      return NextResponse.json({ error: '이메일 발송 에러', data: null });
    }
    return NextResponse.json({ error: null, data: '이메일을 확인해주세요.' });
  }
  // console.log(nonce);
  const { data, error } = await supabase.auth.updateUser({ password: newPassword, nonce });

  if (error) {
    // console.log(error);
    return NextResponse.json({ error: error.message, data: null });
  }

  return NextResponse.json({ data: '성공', error: null });
};
