import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { movieId, ratings } = await req.json();
  const supabse = createRouteHandlerClient({ cookies });

  const { data: userData, error: noUser } = await supabse.auth.getUser();

  if (noUser) {
    return new NextResponse(JSON.stringify({ message: '로그인을 해야합니다.' }), {
      status: 401,
      statusText: 'Unauthorized'
    });
  }

  const userId = userData.user.id;

  const { data: checkIfAlreadyExist } = await supabse
    .from('movie_ratings')
    .select('*')
    .eq('movie_id', movieId)
    .eq('user_id', userId);

  if (!checkIfAlreadyExist!.length) {
    console.log(1);
    // 새로 추가하기
    const { error: rateMovieFailed } = await supabse
      .from('movie_ratings')
      .insert({ user_id: userId, movie_id: movieId, ratings });

    if (rateMovieFailed) {
      console.log(rateMovieFailed);
      return new NextResponse(JSON.stringify({ message: rateMovieFailed.message }), {
        status: 400,
        statusText: 'Bad Request'
      });
    }

    return new NextResponse(JSON.stringify({ message: '추가 성공' }), { status: 200, statusText: 'OK' });
  } else {
    // 변경하기
    const { error: rateMovieFailed } = await supabse
      .from('movie_ratings')
      .update({ user_id: userId, movie_id: movieId, ratings })
      .eq('movie_id', movieId);

    if (rateMovieFailed) {
      console.log(rateMovieFailed);
      return new NextResponse(JSON.stringify({ message: rateMovieFailed.message }), {
        status: 400,
        statusText: 'Bad Request'
      });
    }

    return new NextResponse(JSON.stringify({ message: '변경 성공' }), { status: 200, statusText: 'OK' });
  }
};
