import getMovieDataWithMovieIds from '@/api/getMovieDataWithMovieIds';
import React from 'react';

const TotalWatchingTime = async ({ watched_movies }: { watched_movies: Array<string> }) => {
  const calculateMovieWatchedTime = async (watched_movies: Array<string>) => {
    const getTotalMovieRuntime = (resArray: any) => {
      const movieRuntime = resArray.map((movie: any) => movie.runtime);
      const totalMovieRuntime = movieRuntime.reduce((a: number, b: number) => a + b, 0);

      return totalMovieRuntime as number;
    };
    const formatTotalMovieRuntime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      return `${hours}시간 ${remainingMinutes}분`;
    };

    const movieData = await getMovieDataWithMovieIds(watched_movies);
    const movieTimeInMinutes = getTotalMovieRuntime(movieData);
    const formattedTotalMovieRuntime = formatTotalMovieRuntime(movieTimeInMinutes);

    return formattedTotalMovieRuntime;
  };

  const totalMovieRuntime = await calculateMovieWatchedTime(watched_movies);
  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-gray-300 w-1/3 h-40 rounded-2xl">
      <p className="text-xl">현재까지 본 영화 시간</p>
      <p className="text-lg text-gray-700">{totalMovieRuntime}</p>
    </div>
  );
};

export default TotalWatchingTime;
