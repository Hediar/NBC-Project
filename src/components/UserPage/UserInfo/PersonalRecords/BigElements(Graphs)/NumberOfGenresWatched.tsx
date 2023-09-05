import React from 'react';
import RecordsContainerBig from '../_Containers/RecordsContainerBig';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { getNumbersOfGenresWatched } from '@/api/movieStatistics/getNumbersOfGenresWatched';
import NumberOfGenresGraph from './Graphs/NumberOfGenresGraph';

type Props = {
  userId: string;
};

const NumberOfGenresWatched = async ({ userId }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const [genresResult, genresQuantitiesResult] = await getNumbersOfGenresWatched(userId, supabase);

  return (
    <RecordsContainerBig key="faf0ff" bgColor="#faf0ff" borderColor="#f0d6fc" title="내가 본 영화 장르">
      <NumberOfGenresGraph genreNames={genresResult} quantities={genresQuantitiesResult} />
    </RecordsContainerBig>
  );
};

export default NumberOfGenresWatched;
