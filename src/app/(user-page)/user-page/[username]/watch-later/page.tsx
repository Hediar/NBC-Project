import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import MovieItem from '@/components/common/MovieItem';

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
    return (
      <div className="flex flex-col items-center w-full mt-10 h-[calc(100%-54px)]">
        <h2 className="text-center font-bold text-2xl">{username}님이 좋아하신 영화</h2>
        <div className="flex gap-y-10 justify-center sm:gap-10 md:gap-5 gap-5 items-center h-full">
          <p className="w-full text-2xl text-center">{username}님이 아직 아무 영화도 찜하기에 추가하지 않으셨습니다.</p>
        </div>
      </div>
    );
  }

  const movieList = watchLaterMovies[0].movies;
  const movieDetails = await getMovieDataWithMovieIds(movieList);
  const movieIds = movieDetails.map((movie) => movie.id);

  const getLengthThruErrorCheck = () => {
    let length: number = 0;
    movieIds.map((id) => (!id ? length-- : length++));
    return length;
  };

  const movieContents = movieDetails.map((movie) => <MovieItem key={movie.id} movie={movie} />);

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h2 className="text-center font-bold text-2xl py-10 px-4">
        {username}님이 찜한 {getLengthThruErrorCheck()}개의 영화입니다.
      </h2>
      <div className="w-10/12 flex flex-wrap gap-5 gap-y-10 mt-10 justify-center">{movieContents}</div>
    </div>
  );
};

export default ToWatchListPage;
