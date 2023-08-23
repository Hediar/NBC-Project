// movieGenres = ['1', '2', '3'] 1, 2, 3은 movie 장르 ID

const discoverMoviesWithMovieId = async (movieGenres: Array<string>, page: number = 1) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`
    }
  };

  const targetUrlToRequest = movieGenres.map(
    (genreId) =>
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`
  );
  const fetchPromises = targetUrlToRequest.map((url) => fetch(url, options));
  const responses = await Promise.all(fetchPromises);
  const resArray = await Promise.all(responses.map((res) => res.json()));
  return resArray;
};

export default discoverMoviesWithMovieId;
