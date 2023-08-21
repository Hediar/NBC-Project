import { tmdbApi } from './tmdb';

const getMovieList = async () => {
  const response = await tmdbApi.get('trending/movie/week');

  return response;
};

export { getMovieList };
