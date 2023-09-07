import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import { getMovieGenresById, getMovieGenresByName, sortByMostFrequent } from '@/api/getMovieGenres';
import DisplayInfiniteMovies from '@/components/common/DisplayMoviesInfiniteScroll';
import discoverMoviesWithGenreId from '@/api/discoverMoviesWithGenreId';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import idToUsername from '@/api/supabase/idToUsername';

interface Props {
  username: string;
  watched_movies: string[];
}

const RecommendationList = async ({ username, watched_movies }: Props) => {
  const supabase = createServerComponentClient({ cookies });
  //
  // 유저가 좋아한 영화를 배열화 하기
  const { data: user_id } = await idToUsername(supabase, username);

  const { data: userLikedMoviesGroup } = await supabase
    .from('movielikes')
    .select('movieid')
    .contains('user_id', [user_id]);

  const usersLikedMovies = userLikedMoviesGroup!.map((el) => el.movieid);

  //
  // 유저가 본 영화 데이터를 다 가져오기
  const movieData = await getMovieDataWithMovieIds(usersLikedMovies);

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
  const { data: userData, error: isUserNotSignedIn } = await supabase.auth.getUser();
  if (isUserNotSignedIn) {
    // console.log(isUserNotSignedIn);
    return <>로그인을 해주세요.</>;
  }

  const userId = userData.user.id;

  const { data: ignoreList, error: fetchIgnoreDataError } = await supabase
    .from('ignored_movies')
    .select('ignored_movies')
    .eq('userid', userId)
    .single();

  const { data: watched } = await supabase.from('users').select('watched_movies').eq('id', userId).single();

  // 2. ignoreList와 watched 목록에서 영화 ID 추출
  const ignoredMovieIds = ignoreList?.ignored_movies || [];
  const watchedMovieIds = watched!.watched_movies || [];

  // 3. 필터링하여 제외된 영화들 반환
  const ignoredList = Array.from(new Set([...ignoredMovieIds, ...watchedMovieIds])).map((id) => id.toString());

  let [movieData1, movieData2, movieData3] = threeRecommendationPages.map((page) => page);

  return (
    <div className="w-11/12 sm:w-10/12 mx-auto">
      <h1 className="text-2xl text-center py-12 mb-12"> {username}님이 좋아하신 영화중에 비슷한 장르를 찾아봤어요.</h1>

      <section className="w-full">
        <div className="mb-16">
          <div className="mb-10">
            <h2 className="inline-block text-[28px] sm:text-[32px] font-bold bg-[#ffede5] px-4 py-2 sm:py-3 rounded-xl">
              #{GerneName_A}
            </h2>
            <span className="ml-3 text-[20px] sm:text-[24px] font-bold">어떠세요?</span>
          </div>
          <DisplayInfiniteMovies
            movieData={movieData1}
            discoverMoviesWithGenreId={discoverMoviesWithGenreId}
            genreIdArray={[genreId1]}
            ignoredList={ignoredList}
          />
        </div>

        <div className="mb-16">
          <div className="mb-10">
            <h2 className="inline-block text-[28px] sm:text-[32px] font-bold bg-[#ffede5] px-4 py-2 sm:py-3 rounded-xl">
              #{GerneName_B}
            </h2>
            <span className="ml-3 text-[20px] sm:text-[24px] font-bold">어떠세요?</span>
          </div>
          <DisplayInfiniteMovies
            movieData={movieData2}
            discoverMoviesWithGenreId={discoverMoviesWithGenreId}
            genreIdArray={[genreId2]}
            ignoredList={ignoredList}
          />
        </div>

        <div className=" mb-16">
          <div className="mb-10">
            <h2 className="inline-block text-[28px] sm:text-[32px] font-bold bg-[#ffede5] px-4 py-2 sm:py-3 rounded-xl">
              #{GerneName_C}
            </h2>
            <span className="ml-3 text-[20px] sm:text-[24px] font-bold">어떠세요?</span>
          </div>
          <DisplayInfiniteMovies
            movieData={movieData3}
            discoverMoviesWithGenreId={discoverMoviesWithGenreId}
            genreIdArray={[genreId3]}
            ignoredList={ignoredList}
          />
        </div>
      </section>
    </div>
  );
};

export default RecommendationList;
