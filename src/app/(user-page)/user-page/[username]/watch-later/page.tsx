import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import DisplayMoviesWIthMovieIds from '@/components/common/DisplayMoviesWithMovieIds';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    username: string;
  };
}

const ToWatchListPage = async ({ params }: Props) => {
  const username = decodeURIComponent(params.username);
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userId, error: err } = await supabase.from('users').select('id').eq('username', username);

  const { data: watchLaterMovies, error } = await supabase
    .from('watch_later')
    .select('movies')
    .eq('userid', userId![0].id);

  if (error) {
    return <>데이터 불러오기 오류! 다시 시도해주세요</>;
  }

  if (watchLaterMovies.length === 0) {
    return <div className="h-full">{username}님이 아직 아무 영화도 찜하기에 추가하지 않으셨습니다.</div>;
  }

  const movieList = watchLaterMovies[0].movies;
  const movieDetails = await getMovieDataWithMovieIds(movieList);
  const movieIds = movieDetails.map((movie) => movie.id);

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h2 className="text-center font-bold text-2xl">
        {username}님이 찜한 {movieIds.length}개의 영화입니다.
      </h2>
      <div className="w-10/12 flex flex-wrap gap-5 gap-y-10 mt-10 justify-center">
        <DisplayMoviesWIthMovieIds movieData={movieDetails} />
      </div>
    </div>
  );
};

export default ToWatchListPage;
