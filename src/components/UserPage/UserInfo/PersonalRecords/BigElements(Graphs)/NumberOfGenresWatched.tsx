import React, { Suspense } from 'react';
import RecordsContainerBig from '../_Containers/RecordsContainerBig';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getNumbersOfGenresWatched } from '@/api/movieStatistics/getNumbersOfGenresWatched';
import NumberOfGenresGraph from './Graphs/NumberOfGenresGraph';

type Props = {
  userId: string;
};

const NumberOfGenresWatched = async ({ userId }: Props) => {
  const supabase = createClientComponentClient<Database>();

  const [genresResult, genresQuantitiesResult] = await getNumbersOfGenresWatched(userId, supabase);

  return (
    <>
      {genresResult.length !== 0 ? (
        <RecordsContainerBig key="faf0ff" bgColor="#faf0ff" borderColor="#f0d6fc" title="내가 본 영화 장르 TOP 5">
          <Suspense fallback={<NumberOfGenresGraph genreNames={[]} quantities={[]} />}>
            <NumberOfGenresGraph genreNames={genresResult} quantities={genresQuantitiesResult} />
          </Suspense>
        </RecordsContainerBig>
      ) : (
        <RecordsContainerBig key="faf0ff" bgColor="#faf0ff" borderColor="#f0d6fc" title="내가 본 영화 장르">
          <div className="p-5 text-lg text-center h-full flex justify-center items-center">
            평점을 남기거나 리뷰글을 작성하시면 영화 추천이 가능합니다.
          </div>
        </RecordsContainerBig>
      )}
    </>
  );
};

export default NumberOfGenresWatched;
