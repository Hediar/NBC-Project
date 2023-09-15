import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export const POST = async (req: Request) => {
  const { movieId } = await req.json();
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userData, error: noUser } = await supabase.auth.getUser();

  if (noUser) {
    return NextResponse.json({ isError: true, message: 'no user' });
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
      return NextResponse.json({ isError: true, message: ignoreMoviesError.message });
    }
    return NextResponse.json({ isError: false, message: '추가 성공' });
  } else {
    if (ignoreMovies.ignored_movies.some((el) => el === movieId.toString())) {
      return NextResponse.json({ isError: true, message: '이미 무시목록에 추가된 영화입니다.' });
    }
    const copiedArr = ignoreMovies.ignored_movies;
    copiedArr.push(movieId);

    const { error: updateError } = await supabase
      .from('ignored_movies')
      .update({ userid: userId, ignored_movies: copiedArr })
      .eq('userid', userId);

    if (updateError) {
      return NextResponse.json({ isError: true, message: updateError.message });
    }

    revalidateTag('fetchMovie');
    return NextResponse.json({ isError: false, message: '업데이트 성공' });
  }
};
