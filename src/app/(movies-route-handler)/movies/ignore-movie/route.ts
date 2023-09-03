import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export const POST = async (req: Request) => {
  const url = new URL(req.url);
  const { movieId, path } = await req.json();
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userData, error: noUser } = await supabase.auth.getUser();

  if (noUser) {
    return new NextResponse(JSON.stringify({ isError: true, message: 'no user' }), {
      status: 404,
      statusText: 'Not Found'
    });
  }

  const userId = userData.user!.id;

  const { data: ignoreMovies, error: ignoreMoviesError } = await supabase
    .from('ignored_movies')
    .select('ignored_movies')
    .eq('userid', userId)
    .single();

  if (ignoreMoviesError) {
    const { error: insertError } = await supabase
      .from('ignored_movies')
      .insert({ userid: userId, ignored_movies: [movieId.toString()] });

    if (insertError) {
      return new NextResponse(JSON.stringify({ isError: true, message: ignoreMoviesError.message }), {
        status: 500,
        statusText: 'Internal Server Error'
      });
    }
    return new NextResponse(JSON.stringify({ isError: false, message: '추가 성공' }), {
      status: 200,
      statusText: 'OK'
    });
  } else {
    if (ignoreMovies.ignored_movies.some((el) => el === movieId.toString())) {
      return new NextResponse(JSON.stringify({ isError: true, message: '이미 무시목록에 추가된 영화입니다.' }), {
        status: 500,
        statusText: 'Internal Server Error'
      });
    }
    const copiedArr = ignoreMovies.ignored_movies;
    copiedArr.push(movieId);

    const { error: updateError } = await supabase
      .from('ignored_movies')
      .update({ userid: userId, ignored_movies: copiedArr })
      .eq('userid', userId);

    if (updateError) {
      return new NextResponse(JSON.stringify({ isError: true, message: updateError.message }), {
        status: 500,
        statusText: 'Internal Server Error'
      });
    }

    revalidateTag('fetchMovie');
    return new NextResponse(JSON.stringify({ isError: false, message: '업데이트 성공' }), {
      status: 200,
      statusText: 'OK'
    });
  }
};
