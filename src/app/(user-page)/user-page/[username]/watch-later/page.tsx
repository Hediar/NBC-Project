import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import MovieItem from '@/components/common/MovieItem';
import { Button, Space } from 'antd';
import NoContent from '@/styles/svg/NoContent';
import Link from 'next/link';

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
      <div className="px-3 sm:px-10 flex flex-col items-center justify-center w-full mt-10  h-full">
        <h2 className="text-lg text-center font-bold sm:text-2xl mb-10">{username}님이 찜해둔 영화</h2>
        <div className="flex flex-col gap-y-10 justify-center gap-10 items-center h-full pb-5">
          <p className="text-base sm:text-2xl w-full  text-center">
            {username}님이 아직 아무 영화도 찜하기에 추가하지 않으셨습니다.
          </p>
          <NoContent />
          <Link href="/movielist">
            <Button
              type="primary"
              className="px-5 py-2.5 bg-zinc-600 rounded-lg border border-zinc-600 h-full sm:text-base text-white"
            >
              영화페이지로 이동
            </Button>
          </Link>
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
      <Space className="px-10 justify-center " size={[24, 48]} wrap>
        {movieContents}
      </Space>
    </div>
  );
};

export default ToWatchListPage;
