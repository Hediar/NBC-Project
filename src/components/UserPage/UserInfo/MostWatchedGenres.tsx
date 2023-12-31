import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import { getMovieGenresByName, sortByMostFrequent } from '@/api/getMovieGenres';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

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
  const threeMostGenres = sortByMostFrequent(totalGenres, 3);

  return (
    <div className="w-full h-60  flex  flex-col gap-4 justify-center items-center relative">
      <h2 className="text-[25px] sm:leading-[40px] sm:text-[32px] font-bold px-8 text-center">
        {username}님이 가장 좋아하는 장르는
      </h2>
      <div className="flex gap-2">
        {threeMostGenres.map((genre) => (
          <>
            <div className="bg-[#ffede5] text-xl rounded-xl p-2">
              <span className="font-bold text-[25px] xl:text-[30px]">#{genre}</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default UserPageMostWatchedGenres;
