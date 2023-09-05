import React from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { getMovieTimeByGenres } from '@/api/movieStatistics/getTimeAndNumbersByGenres';
import MovieRuntimeGraph from '../MovieRuntimeGraph';

export const dynamic = 'force-dynamic';

interface Props {
  params: string;
}

const InfographicRecords = async ({ params: username }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: userInfo } = await supabase.from('users').select().eq('username', username);
  const { id: userId, watched_movies } = userInfo![0];

  const numberOfMoviesWatched = watched_movies.length;

  const [titles, runtimesHours] = await getMovieTimeByGenres(userId, supabase);
  return (
    <div className="pt-12 w-full h-96 flex justify-center items-center relative">
      <div className="flex gap-4 w-8/12 h-full">
        <MovieRuntimeGraph titles={titles} runtimes={runtimesHours} />
      </div>
      <div className="absolute bottom-0 border-b-2 border-slate-200 w-full"></div>
    </div>
  );
};

export default InfographicRecords;
