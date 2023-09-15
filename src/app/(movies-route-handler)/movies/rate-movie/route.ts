import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { movieId, ratings } = await req.json();
  const supabse = createRouteHandlerClient({ cookies });

  const { data: userData, error: noUser } = await supabse.auth.getUser();

  if (noUser) {
    return NextResponse.json({ message: '로그인을 해야합니다.' });
  }

  const userId = userData.user.id;

  const { data: checkIfAlreadyExist } = await supabse
    .from('movie_ratings')
    .select('*')
    .eq('movie_id', movieId)
    .eq('user_id', userId);

  if (!checkIfAlreadyExist!.length) {
    // 새로 추가하기
    const { error: rateMovieFailed } = await supabse
      .from('movie_ratings')
      .insert({ user_id: userId, movie_id: movieId, ratings });

    if (rateMovieFailed) {
      return NextResponse.json({ message: rateMovieFailed.message });
    }
    return NextResponse.json({ message: '추가 성공' });
  } else {
    // 변경하기
    const { error: rateMovieFailed } = await supabse
      .from('movie_ratings')
      .update({ user_id: userId, movie_id: movieId, ratings })
      .eq('movie_id', movieId);

    if (rateMovieFailed) {
      return NextResponse.json({ message: rateMovieFailed.message });
    }
    return NextResponse.json({ message: '변경 성공' });
  }
};
