import React from 'react';
import RecordsContainerBig from '../_Containers/RecordsContainerBig';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import idToUsername from '@/api/supabase/idToUsername';
import getGenresUserLikes from '@/api/movieStatistics/getGenresUserLikes';
import NumberOfGenresGraph from './Graphs/NumberOfGenresGraph';

const LikesOnGenres = async ({ username }: { username: string }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { isError, error: fetchIdError, data: userId } = await idToUsername(supabase, username);

  if (isError) {
    console.log(fetchIdError);
    return (
      <RecordsContainerBig key="ecefff" bgColor="#ecefff" borderColor="#cad3fe" title="좋아요 누른 영화 장르">
        <div>
          데이터를 가져오는데 실패했습니다. <br />
          다시 시도해주세요.
        </div>
      </RecordsContainerBig>
    );
  }

  const { data: movieIds, error: fetchDataError } = await supabase
    .from('movielikes')
    .select('movieid')
    .filter('user_id', 'cs', [`{${userId}}`]);

  if (fetchDataError) {
    console.log(fetchDataError);
    return (
      <RecordsContainerBig key="ecefff" bgColor="#ecefff" borderColor="#cad3fe" title="좋아요 누른 영화 장르">
        <div>
          데이터를 가져오는데 실패했습니다. <br />
          다시 시도해주세요.
        </div>
      </RecordsContainerBig>
    );
  }

  const [genresResult, genresQuantitiesResult] = await getGenresUserLikes(movieIds, supabase);

  return (
    <RecordsContainerBig key="ecefff" bgColor="#ecefff" borderColor="#cad3fe" title="좋아요 누른 영화 장르">
      <NumberOfGenresGraph genreNames={genresResult} quantities={genresQuantitiesResult} />
    </RecordsContainerBig>
  );
};

export default LikesOnGenres;

// 1. username 통해서 유저가 좋아요한 영화 이름 가져오기
