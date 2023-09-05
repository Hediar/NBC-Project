import { SupabaseClient } from '@supabase/supabase-js';
import getWatchedMoviesList from './getWatchedMoviesList';
import getMovieDataWithMovieIds from '../getMovieDataWithMovieIds';
import { getMoreOrganizedMovieDetails } from './getOrganizedMovieDetails';
import countMovieGenres from './countMovieGenres';

// 장르별 영화 개수
export const getNumbersOfGenresWatched = async (
  userId: string,
  supabase: SupabaseClient
): Promise<[string[], number[]]> => {
  const watchedList = await getWatchedMoviesList(userId, supabase);

  const movieDetails = await getMovieDataWithMovieIds(watchedList);

  const organizedDetails = getMoreOrganizedMovieDetails(movieDetails);

  const numbersByGenres = organizedDetails.map((detail) => detail.genres);

  const sortedNumberOfGenresWatched = countMovieGenres(numbersByGenres as string[]);

  const genresResult = Object.keys(sortedNumberOfGenresWatched);
  const genresQuantitiesResult = Object.values(sortedNumberOfGenresWatched);

  return [genresResult, genresQuantitiesResult] as [string[], number[]];
};
