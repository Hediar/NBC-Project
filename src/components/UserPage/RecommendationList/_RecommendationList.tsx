import discoverMoviesWithMovieId from '@/api/discoverMoviesWithMovieId';
import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import { MovieDetail, getMovieGenresById, getMovieGenresByName, sortMostFrequentGenres } from '@/api/getMovieGernes';
import React from 'react';
import RecommendByGenreA from './RecommendByGenreA';

interface Props {
  username: string;
  watched_movies: Array<string>;
}

const RecommendationList = async ({ username, watched_movies }: Props) => {
  const movieData = await getMovieDataWithMovieIds(watched_movies);
  const totalGenresId = getMovieGenresById(movieData);
  const totalGenresName = getMovieGenresByName(movieData);

  const threeMostGenresId = sortMostFrequentGenres(totalGenresId, 3);
  const threeMostGenresName = sortMostFrequentGenres(totalGenresName, 3);

  const threeRecommendationPages = await discoverMoviesWithMovieId(threeMostGenresId, 1);

  const [GERNE_A, GERNE_B, GERNE_C] = threeRecommendationPages.map((page) => page);
  const [GerneName_A, GerneName_B, GerneName_C] = threeMostGenresName.map((gerneName) => gerneName);

  return (
    <>
      <div className="w-full h-20 flex flex-col gap-4 justify-center items-center relative">
        <h1 className="text-2xl w-8/12"> {username}님이 좋아하실 만한</h1>
      </div>
      <RecommendByGenreA movieData={GERNE_A} gerne={GerneName_A} />
      {/* <RecommendByGenreB />
      <RecommendByGenreC /> */}
    </>
  );
};

export default RecommendationList;
