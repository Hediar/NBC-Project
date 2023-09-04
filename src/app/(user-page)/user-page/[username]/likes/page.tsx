import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';

import DisplayMoviesWIthMovieIds from '@/components/common/DisplayMoviesWithMovieIds';

interface Props {
  params: {
    username: string;
  };
}
export const dynamic = 'force-dynamic';

const LikesListPage = async ({ params }: Props) => {
  const username = decodeURIComponent(params.username);
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userIdData } = await supabase.from('users').select('id').eq('username', username);

  // layout에서 검증하므로 ! 사용
  const userId = userIdData![0].id;

  const { data: userLikedMoviesGroup } = await supabase
    .from('movielikes')
    .select('movieid')
    .contains('user_id', [userId]);

  // layout에서 검증하므로 ! 사용
  const usersLikedMovies = userLikedMoviesGroup!.map((el) => el.movieid);

  if (usersLikedMovies.length === 0)
    return (
      <div className="flex flex-col items-center w-full mt-10 h-[calc(100%-54px)]">
        <h2 className="text-center font-bold text-2xl">{username}님이 좋아하신 영화</h2>
        <div className="w-10/12 flex gap-y-10 justify-center sm:gap-10 md:gap-5 gap-5 items-center h-full">
          <p className="text-2xl ">아직 {username}님이 좋아요 누른 영화가 없습니다!</p>
        </div>
      </div>
    );

  const movieDetails = await getMovieDataWithMovieIds(usersLikedMovies);

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h2 className="text-center font-bold text-2xl">{username}님이 좋아하신 영화</h2>
      <div className="w-10/12 flex flex-wrap  gap-y-10 mt-10 justify-center sm:gap-10 md:gap-5 gap-5">
        <DisplayMoviesWIthMovieIds movieData={movieDetails} />
      </div>
    </div>
  );
};

export default LikesListPage;
