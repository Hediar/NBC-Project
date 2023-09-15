import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextResponse as NextResponseType } from 'next/server';

// export const runtime = 'edge';

type WatchLater = Database['public']['Tables']['watch_later']['Row'];

// 찜하기 버튼 클릭 시 처리
export const POST = async (request: Request): Promise<NextResponseType<{ message: string }>> => {
  const baseUrl = new URL(request.url);
  const formData = await request.formData();
  const movieId = formData.get('movieId') as string;
  const supabase = createRouteHandlerClient<Database>({ cookies });

  // 쿠키에서 로그인한 유저 정보를 받아서 user id를 저장
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    return NextResponse.json({ message: '유저를 찾을 수 없음.' });
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
    if (supabaseWatchLaterError.message === 'JSON object requested, multiple (or no) rows returned') {
      // 아직 등록된 리스트가 없으면, 추가하기
      const newMovieList = [];
      newMovieList.push(movieId);
      const { data: newlyInsertedData, error: newlyInsertedDataError } = await supabase
        .from('watch_later')
        .insert({ userid: userId, movies: newMovieList })
        .select();
      if (newlyInsertedDataError) {
        return NextResponse.json({ message: 'fail to insert new movie list for new user!' });
      }
      return NextResponse.json({ message: '추가 성공' });
    }
    return NextResponse.json({ message: '리스트 추가 실패' });
  }
  const watchLaterList = watchLaterData.movies;
  //

  // 클릭한 영화의 id가 유저의 찜하기 목록에 있으면 제거하기
  // watchLaterList = ['1','2','3'] '1' = movie_id
  if (watchLaterList.some((movie_id) => movie_id === movieId)) {
    // 삭제
    const updatedWatchLaterData = watchLaterList.filter((movieIdFromDB: string) => movieIdFromDB !== movieId);

    const { data: results, error: supabaseUpdateRequestError } = await supabase
      .from('watch_later')
      .update({ movies: updatedWatchLaterData })
      .eq('userid', userId)
      .select();

    if (supabaseUpdateRequestError) {
      return NextResponse.json({ message: '삭제 실패' });
    }
    return NextResponse.json({ message: '삭제 성공' });
  } else {
    // 클릭한 영화의 id가 유저의 찜하기 목록에 없으면 새로 추가하기
    watchLaterList.push(movieId);
    const { error: watchLaterAddError } = await supabase
      .from('watch_later')
      .update({ movies: watchLaterList })
      .eq('userid', userId);

    if (watchLaterAddError) {
      return NextResponse.json({ message: '추가 실패' });
    }
    return NextResponse.json({ message: '추가 성공' });
  }
};
