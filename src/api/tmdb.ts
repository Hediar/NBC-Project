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

export const getMovieDetail = async (id: string) => {
  try {
    const [detailData, watchProviders, backdropImages, creditsData] = await Promise.all([
      getDetailData(id),

      getProviderData(id),
      getImageData(id),
      getCreditsData(id)
    ]);

    const { appearences, productions } = creditsData;

    const movieDetailData = {
      ...detailData,

      watchProviders,
      backdropImages,
      appearences,
      productions
    };

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

export const getTrailerData = async (id: string) => {
  const trailerRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/videos?language=ko-KR`, options);
  const trailerData = await trailerRes.json();
  const trailerKeys = trailerData.results.map((result: TrailerData) => result.key);
  return trailerKeys;
};

export const getProviderData = async (id: string) => {
  const watchProviderRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/watch/providers`, options);
  const watchProviderData = await watchProviderRes.json();
  const watchProviders = watchProviderData.results['KR'];
  return watchProviders;
};

export const getImageData = async (id: string) => {
  const imageRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/images`, options);
  const imageData = await imageRes.json();
  const backdropImages = imageData.backdrops;
  return backdropImages;
};

export const getCreditsData = async (id: string): Promise<Pick<MovieData, 'appearences' | 'productions'>> => {
  const creditsRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_DETAIL_URL}${id}/credits?language=ko-KR`,
    options
  );
  const creditsData = await creditsRes.json();

  return { appearences: creditsData.cast, productions: creditsData.crew };
};

export const searchReviewMovies = async (query: string, currentPage: number = 1) => {
  const searchRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/movie?query=${query}&include_adult=false&language=ko-KR&page=${currentPage}`,
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
export const getMovieListDataSearch = async (query: string, searchType: string, pageParam: number = 1) => {
  const searchRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/${searchType}?query=${query}&include_adult=false&language=ko-KR&page=${pageParam}`,
    options
  );
  const searchData = await searchRes.json();

  return searchData;
};

// export const contentPageGetDataSearch = async (query: string, searchType: string, pageParam: number = 1) => {
//   const itemsPerPage = 18; // 페이지당 아이템 개수
//   const previousItemsToKeep = (pageParam - 1) * 2; // 이전 페이지에서 유지할 아이템 개수

//   // 현재 페이지에서 필요한 아이템 개수 계산
//   const itemsToFetch = itemsPerPage - previousItemsToKeep;

//   // 페이지당 데이터를 가져오는 요청
//   const searchRes = await fetch(
//     `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/${searchType}?query=${query}&include_adult=false&language=ko-KR&page=${pageParam}`,
//     options
//   );
//   const searchData = await searchRes.json();

//   // 이전 페이지에서 유지할 아이템 가져오기
//   const previousItems = searchData.results.slice(0, previousItemsToKeep);

//   // 현재 페이지에서 필요한 아이템 가져오기
//   const currentItems = searchData.results.slice(previousItemsToKeep, previousItemsToKeep + itemsToFetch);

//   // 페이지당 아이템 개수만큼만 잘라서 반환
//   const slicedData = previousItems.concat(currentItems);

//   // total_pages 계산
//   const total_pages = Math.ceil(searchData.total_results / itemsPerPage);
//   console.log(slicedData);
//   return { results: slicedData, total_pages };
// };

export const getMovieListNotSearch = async (sortType: string, formattedCurrentDate: string, pageParam: number = 1) => {
  const searchRes = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}discover/movie?include_adult=false&include_video=false&language=ko-Kr&page=${pageParam}&primary_release_date.lte=${formattedCurrentDate}&region=KR&sort_by=${sortType}.desc&vote_count.gte=100`,
    options
  );
  const sortData = await searchRes.json();

  return sortData;
};

export { tmdbOptions };
