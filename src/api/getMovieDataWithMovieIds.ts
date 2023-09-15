import { tmdbOptions } from './tmdb';

const getMovieDataWithMovieIds = async (watched_movies: Array<string>) => {
  const targetUrlToRequest = watched_movies.map(
    (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
  );
  const fetchPromises = targetUrlToRequest.map((url) => fetch(url, tmdbOptions));
  const responses = await Promise.all(fetchPromises);
  const resArray = await Promise.all(responses.map((res) => res.json()));

  return resArray as MovieData[];
};

export default getMovieDataWithMovieIds;
