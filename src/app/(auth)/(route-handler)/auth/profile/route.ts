import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
  const supabase = createRouteHandlerClient({ cookies });
  const fileName = Date.now().toString();
  const formData = await request.formData();

  const userId = formData.get('userId');
  const file = formData.get('file');

  const { data: uploadedPhotoData, error } = await supabase.storage
    .from(`users/avatar/${userId}`)
    .upload(fileName, file as File);

  if (error) {
    console.log('error:', error);
    return NextResponse.json({ isSuccess: false, isError: true, data: null });
  }

  console.log('success!', uploadedPhotoData);

  const { data: url } = supabase.storage.from(`users/avatar/${userId}`).getPublicUrl(fileName);

  // Handle success
  console.log('url retrieval success!', url.publicUrl);
  const uploadedPhotoUrl = url.publicUrl;

  const { data: uploadingToUserDB, error: uploadingToUserDBError } = await supabase
    .from('users')
    .update({ avatar_url: uploadedPhotoUrl })
    .eq('id', userId)
    .select('avatar_url');

  if (uploadingToUserDBError) {
    console.log(uploadingToUserDBError);
    return NextResponse.json({ isSuccess: false, isError: true, data: null });
  }

  return NextResponse.json({ isSuccess: true, isError: false, data: url.publicUrl });
};
