import React from 'react';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import LikesOnGenres from './BigElements(Graphs)/LikesOnGenres';
import NumberOfGenresWatched from './BigElements(Graphs)/NumberOfGenresWatched';
import RuntimeByGenres from './BigElements(Graphs)/RuntimeByGenres';

export const dynamic = 'force-dynamic';

interface Props {
  params: string;
}

const UserPagePersonalRecordsGraph = async ({ params: username }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: userInfo } = await supabase.from('users').select().eq('username', username);
  const { id: userId, watched_movies } = userInfo![0];

  const numberOfMoviesWatched = watched_movies.length;

  return (
    <div className="w-full mt-5 flex justify-center items-center">
      <section className="w-full flex gap-4">
        <LikesOnGenres username={username} />
        <NumberOfGenresWatched userId={userId} />
        <RuntimeByGenres userId={userId} />
      </section>
    </div>
  );
};

export default UserPagePersonalRecordsGraph;