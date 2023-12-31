// movieGenres = ['1', '2', '3'] 1, 2, 3은 movie 장르 ID

const discoverMoviesWithGenreId = async (movieGenres: string[], page: number = 1): Promise<MovieFetchResult[]> => {
  'use server';

  const targetUrlToRequest = movieGenres.map(
    (genreId) =>
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`
  );
  const fetchPromises = targetUrlToRequest.map((url) =>
    fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`
      },
      next: { tags: ['fetchMovie'] }
    })
  );
  const responses = await Promise.all(fetchPromises);
  const resArray: MovieFetchResult[] = await Promise.all(responses.map((res) => res.json()));

  return resArray;
};

export default discoverMoviesWithGenreId;
