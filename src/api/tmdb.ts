import { TrailerData } from '@/types/types';

const tmdbOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`
  },
  next: { revalidate: 3600 }
};

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`
  }
};

export const getTrendingMovies = async () => {
  try {
    const movies = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}trending/movie/week?language=ko-KR`,
      tmdbOptions
    );
    const movieData = await movies.json();

    return { ...movieData.results };
  } catch (error) {
    console.error(error);
  }
};

export const getGenres = async () => {
  try {
    const movies = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}genre/movie/list?language=ko`, tmdbOptions);
    const genre = await movies.json();

    return genre;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieDetail = async (id: string) => {
  try {
    const detailRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}?language=ko-KR`, options);
    const detailData = await detailRes.json();

    const trailerRes = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/videos?language=ko-KR`,
      options
    );
    const trailerData = await trailerRes.json();

    const watchProviderRes = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/watch/providers`,
      options
    );
    const watchProviderData = await watchProviderRes.json();

    const imageRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/images`, options);
    const imageData = await imageRes.json();

    const trailerKeys = trailerData.results.map((result: TrailerData) => result.key);
    const watchProviders = watchProviderData.results['KR'];
    const backdropImages = imageData.backdrops;

    const movieDetailData = { ...detailData, trailerKeys, watchProviders, backdropImages };

    return movieDetailData;
  } catch (error) {
    console.error(error);
  }
};
export { tmdbOptions };
