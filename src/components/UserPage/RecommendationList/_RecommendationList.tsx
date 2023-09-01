import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import { getMovieGenresById, getMovieGenresByName, sortByMostFrequent } from '@/api/getMovieGenres';
import DisplayInfiniteMovies from '@/components/common/DisplayMoviesInfiniteScroll';
import discoverMoviesWithGenreId from '@/api/discoverMoviesWithGenreId';
import supabase from '@/supabase/config';

interface Props {
  username: string;
  watched_movies: string[];
}

const RecommendationList = async ({ username, watched_movies }: Props) => {
  // 유저가 본 영화 데이터를 다 가져오기
  const movieData = await getMovieDataWithMovieIds(watched_movies);
  // 영화 데이터들에서 [장르 id]를 추출
  const totalGenresId = getMovieGenresById(movieData);
  // 영화 데이터들에서 [장르 이름]을 추출
  const totalGenresName = getMovieGenresByName(movieData);

  // 추출한 장르 id[]에서 가장 많이 나온 순서대로 나열한 뒤 3개를 가져옴(sortByMostFrequent함수의 2번째 인자)
  const threeMostGenresId = sortByMostFrequent(totalGenresId, 3);
  // 3개의 가장 많이 보는 장르 id
  const [genreId1, genreId2, genreId3] = threeMostGenresId;
  //

  // 추출한 장르 이름[]에서 가장 많이 나온 순서대로 나열한 뒤 3개를 가져옴
  const threeMostGenresName = sortByMostFrequent(totalGenresName, 3);
  // 3개의 가장 많이 보는 장르 이름
  const [GerneName_A, GerneName_B, GerneName_C] = threeMostGenresName.map((gerneName) => gerneName);
  //

  const threeRecommendationPages = await discoverMoviesWithGenreId(threeMostGenresId, 1);

  // 무시하기 필터링

  // 1. 사용자 정보 조회
  const { data: userId } = await supabase.from('users').select('id').eq('username', username);
  const { data: ignoreList } = await supabase
    .from('ignored_movies')
    .select('ignored_movies')
    .eq('userid', userId![0]?.id);
  const { data: watched } = await supabase.from('users').select('watched_movies').eq('id', userId![0]?.id);

  // 2. ignoreList와 watched 목록에서 영화 ID 추출
  const ignoredMovieIds = ignoreList![0]?.ignored_movies || [];
  const watchedMovieIds = watched![0]?.watched_movies || [];

  // 3. 필터링하여 제외된 영화들 반환
  const ignoredList = Array.from(new Set([...ignoredMovieIds, ...watchedMovieIds])).map((id) => id.toString());

  let [movieData1, movieData2, movieData3] = threeRecommendationPages.map((page) => page);

  return (
    <>
      <div className="w-full h-20 flex flex-col gap-4 justify-center items-center relative my-10">
        <h1 className="text-2xl w-10/12"> {username}님이 좋아하실 만한</h1>
      </div>

      <div className="w-10/12 mb-6">
        <div className="mb-10">
          <h2 className="inline-block text-xl bg-slate-300 p-3 rounded-xl">#{GerneName_A}</h2>
        </div>

        <DisplayInfiniteMovies
          movieData={movieData1}
          discoverMoviesWithGenreId={discoverMoviesWithGenreId}
          genreIdArray={[genreId1]}
          ignoredList={ignoredList}
        />
      </div>

      <div className="w-10/12 mb-6">
        <div className="mb-10">
          <h2 className="inline-block text-xl bg-slate-300 p-3 rounded-xl">#{GerneName_B}</h2>
        </div>
        <DisplayInfiniteMovies
          movieData={movieData2}
          discoverMoviesWithGenreId={discoverMoviesWithGenreId}
          genreIdArray={[genreId2]}
          ignoredList={ignoredList}
        />
      </div>

      <div className="w-10/12 mb-6">
        <div className="mb-10">
          <h2 className="inline-block text-xl bg-slate-300 p-3 rounded-xl">#{GerneName_C}</h2>
        </div>
        <DisplayInfiniteMovies
          movieData={movieData3}
          discoverMoviesWithGenreId={discoverMoviesWithGenreId}
          genreIdArray={[genreId3]}
          ignoredList={ignoredList}
        />
      </div>
    </>
  );
};

export default RecommendationList;
