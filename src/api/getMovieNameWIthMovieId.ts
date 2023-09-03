import { tmdbOptions } from './tmdb';

const getMovieNameWIthMovieId = async (movieIdArray: Array<string>): Promise<string[]> => {
  const targetUrlToRequest = movieIdArray.map(
    (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
  );
  const fetchPromises = targetUrlToRequest.map((url) => fetch(url, tmdbOptions));
  const responses = await Promise.all(fetchPromises);
  const resArray = await Promise.all(responses.map((res) => res.json()));
  const titles = resArray.map((movieData) => movieData.title);
  return titles as string[];
};

export default getMovieNameWIthMovieId;
