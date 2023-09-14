import RecordsContainerBig from '../_Containers/RecordsContainerBig';
import getGenresUserLikes from '@/api/movieStatistics/getGenresUserLikes';
import NumberOfGenresGraph from './Graphs/NumberOfGenresGraph';
import publicApi from '@/util/supabase/auth/public';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const LikesOnGenres = async ({ username }: { username: string }) => {
  const { id: userId } = await publicApi.get('username to id', { username });

  if (!userId) {
    // console.log(fetchIdError);
    return (
      <RecordsContainerBig key="ecefff" bgColor="#ecefff" borderColor="#cad3fe" title="좋아요 누른 영화 장르">
        <div>
          데이터를 가져오는데 실패했습니다. <br />
          다시 시도해주세요.
        </div>
      </RecordsContainerBig>
    );
  }
  const supabase = createClientComponentClient();
  const { data: movieIds, error: fetchDataError } = await supabase
    .from('movielikes')
    .select('movieid')
    .filter('user_id', 'cs', [`{${userId}}`]);

  if (fetchDataError) {
    // console.log(fetchDataError);
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
    <>
      {genresResult.length !== 0 ? (
        <RecordsContainerBig key="ecefff" bgColor="#ecefff" borderColor="#cad3fe" title="좋아요 누른 영화 장르 TOP 5">
          <NumberOfGenresGraph genreNames={genresResult} quantities={genresQuantitiesResult} />
        </RecordsContainerBig>
      ) : (
        <RecordsContainerBig key="ecefff" bgColor="#ecefff" borderColor="#cad3fe" title="좋아요 누른 영화 장르">
          <div className="p-5 text-lg text-center h-full flex justify-center items-center">
            평점을 남기거나 리뷰글을 작성하시면 영화 추천이 가능합니다.
          </div>
        </RecordsContainerBig>
      )}
    </>
  );
};

export default LikesOnGenres;

// 1. username 통해서 유저가 좋아요한 영화 이름 가져오기
