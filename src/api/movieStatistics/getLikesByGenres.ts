import { SupabaseClient } from '@supabase/supabase-js';
import getWatchedMoviesList from './getWatchedMoviesList';
import getMovieDataWithMovieIds from '../getMovieDataWithMovieIds';
import { getMoreOrganizedMovieDetails } from './getOrganizedMovieDetails';

// 장르별 영화 시간
export const getLikesByGenres = async (userId: string, supabase: SupabaseClient): Promise<[string[], number[]]> => {
  const watchedList = await getWatchedMoviesList(userId, supabase);
  const movieDetails = await getMovieDataWithMovieIds(watchedList);
  const organizedDetails = getMoreOrganizedMovieDetails(movieDetails);
  const runTimeByGenres = organizedDetails.map((detail): Record<string, number> => {
    return {
      [detail.genres as string]: detail.runtime
    };
  });

  const result = runTimeByGenres.reduce((acc, genreObj) => {
    for (const genre in genreObj) {
      if (!acc[genre]) {
        acc[genre] = 0;
      }
      acc[genre] += genreObj[genre];
    }
    return acc;
  }, {});

  const resultArray = Object.entries(result).map(([genre, runtime]) => ({
    [genre]: runtime
  }));

  const titles = resultArray.map((el) => Object.keys(el)).flat();
  const runtimesHours = resultArray
    .map((el) => Object.values(el))
    .flat()
    .map((el) => Number((el / 60).toFixed(1)));

  return [titles, runtimesHours] as [string[], number[]];
};
