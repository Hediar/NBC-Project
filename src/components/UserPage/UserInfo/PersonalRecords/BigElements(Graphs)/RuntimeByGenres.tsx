import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { getMovieTimeByGenres } from '@/api/movieStatistics/getRuntimesByGenres';
import RecordsContainerBig from '../_Containers/RecordsContainerBig';
import MovieRuntimeGraph from './Graphs/MovieRuntimeGraph.backup';

export const dynamic = 'force-dynamic';

type Props = {
  userId: string;
};

const RuntimeByGenres = async ({ userId }: Props) => {
  const supabase = createServerComponentClient({ cookies });

  const [titles, runtimesHours] = await getMovieTimeByGenres(userId, supabase);
  return (
    <>
      {titles.length !== 0 ? (
        <RecordsContainerBig key="ffede5" bgColor="#ffede5" borderColor="#fcd5c4" title="영화별 시청 시간">
          <Suspense fallback={<MovieRuntimeGraph titles={[]} runtimes={[]} />}>
            <MovieRuntimeGraph titles={titles} runtimes={runtimesHours} />
          </Suspense>
        </RecordsContainerBig>
      ) : (
        <RecordsContainerBig key="ffede5" bgColor="#ffede5" borderColor="#fcd5c4" title="영화별 시청 시간">
          <div className="p-5 text-lg text-center h-full flex justify-center items-center">
            평점을 남기거나 리뷰글을 작성하시면 영화 추천이 가능합니다.
          </div>
        </RecordsContainerBig>
      )}
    </>
  );
};

export default RuntimeByGenres;
