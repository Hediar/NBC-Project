import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
  const cookieStore = cookies();
  const formData = await request.formData();
  const postId = String(formData.get('postId'));
  const data = cookieStore.get('discussionId');

  if (data) {
    const seenPosts = JSON.parse(data.value);

    if (seenPosts.includes(postId)) return NextResponse.json({ error: false, message: '이미 봄' });

    seenPosts.push(postId);
    cookies().set('discussionId', JSON.stringify(seenPosts));
  } else {
    cookies().set('discussionId', JSON.stringify([postId]));
  }

  return NextResponse.json({ error: false, message: '쿠키생성' });
};
