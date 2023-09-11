import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import authApi from '@/util/supabase/auth/auth';

const avatar_url = [
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-1.png',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-2.png?t=2023-09-11T06%3A40%3A10.903Z',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-3.png',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-4.png?t=2023-09-11T06%3A40%3A25.813Z',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-5.png?t=2023-09-11T06%3A40%3A33.998Z'
];

export const POST = async (req: Request) => {
  const { target } = await req.json();
  const index = Number(target);
  const newAvatarUrl = avatar_url[index];

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { userId } = await authApi.get('userId');

  const { data, error } = await supabase
    .from('users')
    .update({ avatar_url: newAvatarUrl })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ isError: true, newUrl: data });
  }

  return NextResponse.json({ isError: false, newUrl: data });
};
