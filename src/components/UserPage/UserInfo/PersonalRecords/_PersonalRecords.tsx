import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import NumberOfReviews from './NumberOfReviews';
import TotalWatchingTime from './TotalWatchingTime';
import NumberOfMoviesWatched from './NumberOfMoviesWatched';
export const dynamic = 'force-dynamic';
interface Props {
  params: string;
}

const UserPagePersonalRecords = async ({ params: username }: Props) => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from('users').select().eq('username', username);
  const { id: userId, watched_movies } = data![0];

  const numberOfMoviesWatched = watched_movies.length;

  return (
    <div className="w-full h-64  flex justify-center items-center relative">
      <div className="flex gap-4 w-8/12">
        <NumberOfReviews userId={userId} />
        <TotalWatchingTime watched_movies={watched_movies} />
        <NumberOfMoviesWatched numberOfMoviesWatched={numberOfMoviesWatched} />
      </div>
      <div className="absolute bottom-0 border-b-2 border-slate-200 w-full"></div>
    </div>
  );
};

export default UserPagePersonalRecords;
