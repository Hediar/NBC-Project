import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type WatchLater = Database['public']['Tables']['watch_later']['Row'];

// 찜하기 버튼 클릭 시 처리
export const POST = async (request: Request) => {
  const baseUrl = new URL(request.url);
  const formData = await request.formData();
  const movieId = formData.get('movieId') as string;
  const supabase = createRouteHandlerClient<Database>({ cookies });

  // 쿠키에서 로그인한 유저 정보를 받아서 user id를 저장
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    return NextResponse.redirect(baseUrl.origin, { status: 301 });
  }
  const userId = userData.user.id;
  //

  // watch_later DB에서 해당 유저의 찜하기 리스트를 가져오기
  const { data: watchLaterData, error: supabaseWatchLaterError } = await supabase
    .from('watch_later')
    .select('movies')
    .eq('userid', userId)
    .single<WatchLater>();

  if (supabaseWatchLaterError) {
    console.log(supabaseWatchLaterError);
    return NextResponse.redirect(baseUrl.origin, { status: 301 });
  }
  const watchLaterList = watchLaterData.movies;
  //

  // 클릭한 영화의 id가 유저의 찜하기 목록에 있으면 제거하기
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
    // 클릭한 영화의 id가 유저의 찜하기 목록에 없으면 새로 추가하기
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
