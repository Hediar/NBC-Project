const tmdbOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`
  },
  next: { revalidate: 3600 }
};

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`
  }
};

export const getTrendingMovies = async () => {
  try {
    const movies = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}trending/movie/week?include_adult=false&language=ko-KR`,
      options
    );
    const movieData = await movies.json();

    return movieData;
  } catch (error) {
    console.error(error);
  }
};

// 최신 영화
export const getNewMovies = async (formattedCurrentDate: string, formattedOneMonthPrev: string) => {
  try {
    const movies = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&release_date.gte=${formattedOneMonthPrev}&release_date.lte=${formattedCurrentDate}&region=KR&sort_by=primary_release_date.desc&vote_count.gte=50`,
      options
    );
    const movieData = await movies.json();

    return movieData;
  } catch (error) {
    console.error(error);
  }
};

export const getGenres = async () => {
  try {
    const movies = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}genre/movie/list?language=ko`, options);
    const genre = await movies.json();

    return genre;
  } catch (error) {
    console.error(error);
  }
};

// 장르별로 검색
export const fetchTrendMoviesByGenre = async (genreId: number | string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&vote_count.gte=1000&with_genres=${genreId}`,
      options
    );
    const genreMovieData = await response.json();
    return genreMovieData;
  } catch (error) {
    console.error(error);
  }
};

export const getDetailData = async (id: string): Promise<MovieData | undefined> => {
  try {
    const detailRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}?language=ko-KR`, options);
    const detailData = await detailRes.json();

    return detailData;
  } catch (error) {}
};

export const getTrailerData = async (id: string) => {
  try {
    const trailerRes = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/videos?language=ko-KR`,
      options
    );
    const trailerData = await trailerRes.json();
    const trailerKeys = trailerData.results.map((result: TrailerData) => result.key);
    return trailerKeys;
  } catch (error) {}
};

export const getProviderData = async (id: string) => {
  try {
    const watchProviderRes = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/watch/providers`,
      options
    );
    const watchProviderData = await watchProviderRes.json();
    const watchProviders = watchProviderData.results['KR'];
    return watchProviders;
  } catch (error) {}
};

export const getImageData = async (id: string) => {
  try {
    const imageRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/images`, options);
    const imageData = await imageRes.json();
    const backdropImages = imageData.backdrops;
    return backdropImages;
  } catch (error) {}
};

export const getCreditsData = async (id: string) => {
  try {
    const creditsRes = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/credits?language=ko-KR`,
      options
    );
    const creditData = await creditsRes.json();
    const { cast: appearences, crew: productions } = creditData;

    return { appearences, productions };
  } catch (error) {}
};

export const searchReviewMovies = async (query: string, currentPage: number = 1) => {
  try {
    const searchRes = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/movie?query=${query}&include_adult=false&language=ko-KR&page=${currentPage}`,
      options
    );
    const searchData = await searchRes.json();

    return searchData;
  } catch (error) {}
};

// 참여한 사람이 들어간 영화 목록 가져오기
export const searchParticipatedMovies = async (query: string) => {
  try {
    const searchRes = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/person?query=${query}&include_adult=false&language=ko-KR&page=1`,
      options
    );
    const searchData = await searchRes.json();

    return searchData;
  } catch (error) {}
};
export const searchTMDB = async (query: string, searchType: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/${searchType}?query=${query}&include_adult=false&language=ko-KR&page=1`;
    const searchRes = await fetch(url, options);
    const searchData = await searchRes.json();
    return searchData;
  } catch (error) {}
};

// 콘텐츠 페이지
export const getMovieListDataSearch = async (query: string, searchType: string, pageParam: number = 1) => {
  try {
    const searchRes = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/${searchType}?query=${query}&include_adult=false&language=ko-KR&page=${pageParam}`,
      options
    );
    const searchData = await searchRes.json();

    return searchData;
  } catch (error) {}
};

export const getMovieListNotSearch = async (sortType: string, formattedCurrentDate: string, pageParam: number = 1) => {
  const searchRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}discover/movie?include_adult=false&include_video=false&language=ko-Kr&page=${pageParam}&primary_release_date.lte=${formattedCurrentDate}&region=KR&sort_by=${sortType}.desc&vote_count.gte=100`,
    options
  );
  const sortData = await searchRes.json();

  return sortData;
};

export { tmdbOptions };
