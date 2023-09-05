import React from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { getMovieTimeByGenres } from '@/api/movieStatistics/getRuntimesByGenres';
import RecordsContainerBig from '../_Containers/RecordsContainerBig';
import MovieRuntimeGraph from './Graphs/MovieRuntimeGraph';

type Props = {
  userId: string;
};

const RuntimeByGenres = async ({ userId }: Props) => {
  const supabase = createServerComponentClient({ cookies });

  const [titles, runtimesHours] = await getMovieTimeByGenres(userId, supabase);
  return (
    <RecordsContainerBig key="ffede5" bgColor="#ffede5" borderColor="#fcd5c4" title="영화별 시청 시간">
      <MovieRuntimeGraph titles={titles} runtimes={runtimesHours} />
    </RecordsContainerBig>
  );
};

export default RuntimeByGenres;
