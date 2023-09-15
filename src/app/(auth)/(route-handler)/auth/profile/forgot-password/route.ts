import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// export const runtime = 'edge';

export const POST = async (req: Request) => {
  const { email, captchaToken } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    captchaToken,
    redirectTo: `${process.env.BASE_URL}/forgot-password`
  });

  if (error) {
    // console.log(error);
    return NextResponse.json({ data: null, error: { message: error.message } });
  }

  return NextResponse.json({ data: email, error: null });
};
