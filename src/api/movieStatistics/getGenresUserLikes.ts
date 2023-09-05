import { SupabaseClient } from '@supabase/supabase-js';
import getMovieDataWithMovieIds from '../getMovieDataWithMovieIds';
import { getMoreOrganizedMovieDetails } from './getOrganizedMovieDetails';
import countMovieGenres from './countMovieGenres';

type MovieId = { movieid: string };
type MovieIds = MovieId[];

const getGenresUserLikes = async (movieIds: MovieIds, supabase: SupabaseClient) => {
  const movieIdArray = movieIds.map((el) => el.movieid);
  const movieDetails = await getMovieDataWithMovieIds(movieIdArray);
  const organizedDetails = getMoreOrganizedMovieDetails(movieDetails);

  const numbersByGenres = organizedDetails.map((detail) => detail.genres);

  const sortedNumberOfGenresWatched = countMovieGenres(numbersByGenres as string[]);

  const genresResult = Object.keys(sortedNumberOfGenresWatched);
  const genresQuantitiesResult = Object.values(sortedNumberOfGenresWatched);

  return [genresResult, genresQuantitiesResult] as [string[], number[]];
};

export default getGenresUserLikes;
