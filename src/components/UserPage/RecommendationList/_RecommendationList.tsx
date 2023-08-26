import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import { getMovieGenresById, getMovieGenresByName, sortMostFrequentGenres } from '@/api/getMovieGernes';
import DisplayInfiniteMovies from '@/components/common/_DisplayMoviesInfiniteScroll';
import discoverMoviesWithGenreId from '@/api/discoverMoviesWithGenreId';

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

  // 추출한 장르 id[]에서 가장 많이 나온 순서대로 나열한 뒤 3개를 가져옴(sortMostFrequentGenres함수의 2번째 인자)
  const threeMostGenresId = sortMostFrequentGenres(totalGenresId, 3);
  // 3개의 가장 많이 보는 장르 id
  const [genreId1, genreId2, genreId3] = threeMostGenresId;
  //

  // 추출한 장르 이름[]에서 가장 많이 나온 순서대로 나열한 뒤 3개를 가져옴
  const threeMostGenresName = sortMostFrequentGenres(totalGenresName, 3);
  // 3개의 가장 많이 보는 장르 이름
  const [GerneName_A, GerneName_B, GerneName_C] = threeMostGenresName.map((gerneName) => gerneName);
  //

  const threeRecommendationPages = await discoverMoviesWithGenreId(threeMostGenresId, 1);

  const [movieData1, movieData2, movieData3] = threeRecommendationPages.map((page) => page);

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
        />
      </div>
    </>
  );
};

export default RecommendationList;
