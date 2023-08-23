import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
interface Props {
  username: string;
}

interface MovieGenres {
  id: string;
  name: string;
}

const UserPageMostWatchedGenres = async ({ username }: Props) => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from('users').select().eq('username', username);
  const { id: userId, watched_movies } = data![0];
  const movieData = await getMovieDataWithMovieIds(watched_movies);

  const getMovieGenres = () => {
    const movieGenresMix: Array<Array<MovieGenres>> = movieData.map((movie) => movie.genres);
    const allGenres = movieGenresMix.flatMap((genres) => genres.map((genre) => genre.name));
    return allGenres;
  };

  const sortMostFrequentGenres = (allGenres: Array<string>, howManyGenres: number) => {
    const genreCounts = {} as any;
    allGenres.forEach((genre) => {
      if (genreCounts[genre]) {
        genreCounts[genre]++;
      } else {
        genreCounts[genre] = 1;
      }
    });
    const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);

    return sortedGenres.slice(0, howManyGenres);
  };
  const totalGenres = getMovieGenres();
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
