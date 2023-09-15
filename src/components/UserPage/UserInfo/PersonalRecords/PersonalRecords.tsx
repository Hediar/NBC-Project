import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import NumberOfReviews from './SmallElements/NumberOfReviews';
import NumberOfMoviesWatched from './SmallElements/NumberOfMoviesWatched';
import TotalWatchingTime from './SmallElements/TotalWatchingTime';

interface Props {
  params: string;
}

const UserPagePersonalRecords = async ({ params: username }: Props) => {
  const supabase = createClientComponentClient<Database>();
  const { data: userInfo } = await supabase.from('users').select().eq('username', username);
  const { id: userId, watched_movies } = userInfo![0];

  const numberOfMoviesWatched = watched_movies.length;

  return (
    <div className="w-full mt-5 flex justify-center items-center">
      <section className="w-full flex flex-col gap-4 lg:flex-row">
        <NumberOfReviews userId={userId} />
        <NumberOfMoviesWatched numberOfMoviesWatched={numberOfMoviesWatched} />
        <TotalWatchingTime watched_movies={watched_movies} />
      </section>
    </div>
  );
};

export default UserPagePersonalRecords;
