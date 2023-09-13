import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import authApi from '@/util/supabase/auth/auth';

export const avatar_url = [
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-1-large.png?t=2023-09-13T06%3A27%3A25.083Z',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-2-large.png?t=2023-09-13T06%3A27%3A34.175Z',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-3-large.png?t=2023-09-13T06%3A27%3A54.809Z',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-4-large.png?t=2023-09-13T06%3A28%3A01.723Z',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-5-large.png?t=2023-09-13T06%3A28%3A08.194Z'
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
