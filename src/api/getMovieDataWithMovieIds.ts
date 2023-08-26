const getMovieDataWithMovieIds = async (watched_movies: Array<string>) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`
    }
  };

  const targetUrlToRequest = watched_movies.map(
    (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
  );
  const fetchPromises = targetUrlToRequest.map((url) => fetch(url, options));
  const responses = await Promise.all(fetchPromises);
  const resArray = await Promise.all(responses.map((res) => res.json()));

  return resArray as MovieData[];
};

export default getMovieDataWithMovieIds;
