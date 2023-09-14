import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import LikesOnGenres from './BigElements(Graphs)/LikesOnGenres';
import NumberOfGenresWatched from './BigElements(Graphs)/NumberOfGenresWatched';
import RuntimeByGenres from './BigElements(Graphs)/RuntimeByGenres';

interface Props {
  params: string;
}

const UserPagePersonalRecordsGraph = async ({ params: username }: Props) => {
  const supabase = createClientComponentClient<Database>();
  const { data: userInfo } = await supabase.from('users').select().eq('username', username);
  const { id: userId, watched_movies } = userInfo![0];

  return (
    <div className="w-full mt-5 flex justify-center items-center">
      <section className="pb-12 xl:pb-0 w-full flex flex-col gap-4  xl:flex-row ">
        <LikesOnGenres username={username} />
        <span className="sr-only">Related Graph</span>
        <NumberOfGenresWatched userId={userId} />
        <span className="sr-only">Related Graph</span>
        <RuntimeByGenres userId={userId} />
        <span className="sr-only">Related Graph</span>
      </section>
    </div>
  );
};

export default UserPagePersonalRecordsGraph;
