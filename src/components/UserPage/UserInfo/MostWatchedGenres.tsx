import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import { getMovieGenresByName, sortMostFrequentGenres } from '@/api/getMovieGernes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
interface Props {
  username: string;
}

const UserPageMostWatchedGenres = async ({ username }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from('users').select('watched_movies').eq('username', username).single();

  const watched_movies = data!.watched_movies;

  if (!watched_movies.length) return <></>;

  const movieData = await getMovieDataWithMovieIds(watched_movies);
  const totalGenres = getMovieGenresByName(movieData);
  const threeMostGenres = sortMostFrequentGenres(totalGenres, 3);

  return (
    <div className="w-full h-60  flex  flex-col gap-4 justify-center items-center relative">
      <h2 className="text-2xl">{username}님이 가장 좋아하는 장르는</h2>
      <div className="flex gap-2">
        {threeMostGenres.map((genre) => (
          <>
            <div className="bg-gray-300 text-xl rounded-xl p-2">#{genre}</div>
          </>
        ))}
      </div>

      <div className="absolute bottom-0 border-b-2 border-slate-200 w-full"></div>
    </div>
  );
};

export default UserPageMostWatchedGenres;
