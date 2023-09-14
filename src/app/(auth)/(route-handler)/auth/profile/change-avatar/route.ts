import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import authApi from '@/util/supabase/auth/auth';

export const avatar_url = [
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/Avatar1.png',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/Avatar2.png',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/Avatar3.png',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/Avatar4.png',
  'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/Avatar5.png'
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
