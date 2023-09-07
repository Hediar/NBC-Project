import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const formData = await request.formData();

    const userId = formData.get('userId');
    const file = formData.get('file');
    const fileName = Date.now().toString();

    const uploadPath = `users/avatar/${userId}`;
    const { data: uploadedPhotoData, error: uploadError } = await supabase.storage
      .from(uploadPath)
      .upload(fileName, file as File);

    const { data: publicUrlData } = supabase.storage.from(uploadPath).getPublicUrl(fileName);

    const publicUrl = publicUrlData.publicUrl;

    // console.log('publicUrl', publicUrl);

    await supabase.from('users').update({ avatar_url: publicUrl }).eq('id', userId);

    return NextResponse.json({ isSuccess: true, isError: false, data: publicUrl });
  } catch (error) {
    console.error('Error uploading and updating:', error);
    return NextResponse.json({ isSuccess: false, isError: true, data: null });
  }
};
