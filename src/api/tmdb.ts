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
    const movies = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}trending/movie/week?language=ko-KR`, options);
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
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&release_date.gte=${formattedOneMonthPrev}&release_date.lte=${formattedCurrentDate}&region=KR&sort_by=primary_release_date.desc&vote_count.gte=100`,
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
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
      options
    );
    const genreMovieData = await response.json();
    return genreMovieData;
  } catch (error) {
    console.error(error);
  }
};

//추후 리팩토링!!
export const getMovieDetail = async (id: string) => {
  try {
    //Details
    const detailData = await getDetailData(id);

    //Videos
    const trailerData = await getTrailerData(id);
    const trailerKeys = trailerData.results.map((result: TrailerData) => result.key);

    //Watch Providers
    const watchProviderData = await getProviderData(id);
    const watchProviders = watchProviderData.results['KR'];

    //Images
    const imageData = await getImageData(id);
    const backdropImages = imageData.backdrops;

    //Credits
    const { appearences, productions } = await getCreditsData(id);

    const movieDetailData = { ...detailData, trailerKeys, watchProviders, backdropImages, appearences, productions };

    return movieDetailData;
  } catch (error) {
    console.error(error);
  }
};

export const getDetailData = async (id: string) => {
  const detailRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}?language=ko-KR`, options);
  const detailData = await detailRes.json();

  return detailData;
};

const getTrailerData: any = async (id: string) => {
  const trailerRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/videos?language=ko-KR`, options);
  const trailerData = await trailerRes.json();

  return trailerData;
};

const getProviderData = async (id: string) => {
  const watchProviderRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/watch/providers`, options);
  const watchProviderData = await watchProviderRes.json();

  return watchProviderData;
};

const getImageData = async (id: string) => {
  const imageRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/images`, options);
  const imageData = await imageRes.json();

  return imageData;
};

const getCreditsData = async (id: string) => {
  const creditsRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/credits?language=ko-KR`,
    options
  );
  const creditsData = await creditsRes.json();

  return { appearences: creditsData.cast, productions: creditsData.crew };
};

export const searchReviewMovies = async (query: string, currentPage: number = 1) => {
  const searchRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/movie?query=${query}&include_adult=true&language=ko-KR&page=${currentPage}`,
    options
  );
  const searchData = await searchRes.json();

  return searchData;
};

// 참여한 사람이 들어간 영화 목록 가져오기
export const searchParticipatedMovies = async (query: string) => {
  const searchRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/person?query=${query}&include_adult=false&language=ko-KR&page=1`,
    options
  );
  const searchData = await searchRes.json();

  return searchData;
};
export const searchTMDB = async (query: string, searchType: string) => {
  const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/${searchType}?query=${query}&include_adult=false&language=ko-KR&page=1`;
  const searchRes = await fetch(url, options);
  const searchData = await searchRes.json();
  return searchData;
};

// 콘텐츠 페이지
export const contentPageGetDataSearch = async (query: string, searchType: string, pageParam: number = 1) => {
  const searchRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/${searchType}?query=${query}&include_adult=false&language=ko-KR&page=${pageParam}`,
    options
  );
  const searchData = await searchRes.json();

  return searchData;
};

export const contentPageGetDataDiscover = async (
  sortType: string,
  formattedCurrentDate: string,
  pageParam: number = 1
) => {
  const searchRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}discover/movie?include_adult=false&include_video=false&language=ko-Kr&page=${pageParam}&primary_release_date.lte=${formattedCurrentDate}&region=KR&sort_by=${sortType}.desc&vote_count.gte=100`,
    options
  );
  const sortData = await searchRes.json();

  return sortData;
};

export { tmdbOptions };
