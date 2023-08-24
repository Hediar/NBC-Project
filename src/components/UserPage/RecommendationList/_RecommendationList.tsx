import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import { getMovieGenresById, getMovieGenresByName, sortMostFrequentGenres } from '@/api/getMovieGernes';
import DisplayInfiniteMovies from '@/components/common/_DisplayMoviesInfiniteScroll';
import discoverMoviesWithGenreId from '@/api/discoverMoviesWithGenreId';

interface Props {
  username: string;
  watched_movies: Array<string>;
}

const RecommendationList = async ({ username, watched_movies }: Props) => {
  if (watched_movies.length === 0) {
    return <>아직 아무 영화도 추가하지 않으셨습니다.</>;
  }

  const movieData = await getMovieDataWithMovieIds(watched_movies);
  const totalGenresId = getMovieGenresById(movieData);
  const totalGenresName = getMovieGenresByName(movieData);

  const threeMostGenresId = sortMostFrequentGenres(totalGenresId, 3);
  const [genreId1, genreId2, genreId3] = threeMostGenresId;
  const threeMostGenresName = sortMostFrequentGenres(totalGenresName, 3);

  const threeRecommendationPages = await discoverMoviesWithGenreId(threeMostGenresId, 1);

  const [GERNE_A, GERNE_B, GERNE_C] = threeRecommendationPages.map((page) => page);
  const [GerneName_A, GerneName_B, GerneName_C] = threeMostGenresName.map((gerneName) => gerneName);

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
          movieData={GERNE_A}
          loadMoreFunction={discoverMoviesWithGenreId}
          genreIdArray={[genreId1]}
        />
      </div>

      <div className="w-10/12 mb-6">
        <div className="mb-10">
          <h2 className="inline-block text-xl bg-slate-300 p-3 rounded-xl">#{GerneName_B}</h2>
        </div>
        <DisplayInfiniteMovies
          movieData={GERNE_B}
          loadMoreFunction={discoverMoviesWithGenreId}
          genreIdArray={[genreId2]}
        />
      </div>

      <div className="w-10/12 mb-6">
        <div className="mb-10">
          <h2 className="inline-block text-xl bg-slate-300 p-3 rounded-xl">#{GerneName_C}</h2>
        </div>
        <DisplayInfiniteMovies
          movieData={GERNE_C}
          loadMoreFunction={discoverMoviesWithGenreId}
          genreIdArray={[genreId3]}
        />
      </div>
    </>
  );
};

export default RecommendationList;
