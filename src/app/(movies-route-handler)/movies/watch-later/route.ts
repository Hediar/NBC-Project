import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// 찜하기 버튼 클릭 시 처리
export const POST = async (request: Request) => {
  const baseUrl = new URL(request.url);
  const formData = await request.formData();
  const movieId = formData.get('movieId') as string;
  const supabase = createRouteHandlerClient({ cookies });

  const { data: userData, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    return NextResponse.redirect(baseUrl.origin, { status: 301 });
  }
  const userId = userData.user.id;

  const { data: watchLaterData, error: supabaseWatchLaterError } = await supabase
    .from('watch_later')
    .select('movies')
    .eq('userid', userId)
    .single();

  if (supabaseWatchLaterError) {
    console.log(supabaseWatchLaterError);
    return NextResponse.redirect(baseUrl.origin, { status: 301 });
  }
  const watchLaterList: string[] = watchLaterData.movies;

  // watchLaterList = ['1','2','3'] '1' = movie_id
  if (watchLaterList.some((movie_id) => movie_id === movieId)) {
    // 삭제
    const updatedWatchLaterData = watchLaterList.filter((movieIdFromDB: string) => movieIdFromDB !== movieId);

    const { data: results, error: supabaseUpdateRequest } = await supabase
      .from('watch_later')
      .update({ movies: updatedWatchLaterData })
      .eq('userid', userId)
      .select();

    if (supabaseUpdateRequest) {
      console.log(supabaseUpdateRequest);
      return NextResponse.redirect(baseUrl.origin, { status: 301 });
    }

    return NextResponse.redirect(baseUrl.origin, { status: 301 });
  } else {
    // 추가
    watchLaterList.push(movieId);
    const { error: watchLaterAddError } = await supabase
      .from('watch_later')
      .update({ movies: watchLaterList })
      .eq('userid', userId);

    if (watchLaterAddError) {
      console.log(watchLaterAddError);
      return NextResponse.redirect(baseUrl.origin, { status: 301 });
    }
    return NextResponse.redirect(baseUrl.origin, { status: 301 });
  }
};
