import { tmdbApi } from './tmdb';

const getMovieList = async (params: any) => {
  const response = await tmdbApi.get('/movie/popular');
};

export { getMovieList };
