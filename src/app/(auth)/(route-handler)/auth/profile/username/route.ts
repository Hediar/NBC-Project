import isUsernameAvailable from '@/api/generateUsername/isUsernameAvailable';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface Response {
  isError: boolean;
  isSuccess: boolean;
  error: null | string;
  newUsername?: undefined | { username: string };
}

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();
    const username = String(formData.get('username'));
    const id = String(formData.get('id'));
    const supabase = createRouteHandlerClient({ cookies });

    if (!(await isUsernameAvailable(username, supabase))) {
      return NextResponse.json<Response>({ isError: true, isSuccess: false, error: '이미 등록된 닉네임입니다.' });
    }

    const { error: userRawMetaDataUpdateError } = await supabase.auth.updateUser({
      data: { username }
    });

    if (userRawMetaDataUpdateError) {
      return NextResponse.json<Response>({ isError: true, isSuccess: false, error: 'raw_user_meta_data update error' });
    }

    const { data: updatePublicUserDB, error: updatePublicUserDBError } = await supabase
      .from('users')
      .update({ username: username })
      .eq('id', id)
      .select('username')
      .single();

    if (updatePublicUserDBError) {
      return NextResponse.json<Response>({ isError: true, isSuccess: false, error: 'public users update error' });
    }

    return NextResponse.json<Response>({
      isError: false,
      isSuccess: true,
      error: null,
      newUsername: updatePublicUserDB
    });
  } catch (error) {
    return NextResponse.json<Response>({ isError: true, isSuccess: false, error: 'error occured.' });
  }
};
