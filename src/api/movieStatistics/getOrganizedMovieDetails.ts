export const getOrganizedMovieDetails = (movieDetails: MovieData[]): OrganizedMovieDetails[] => {
  const organizedDetails = movieDetails.map((movie) => {
    const genres = movie.genres.map((genre) => genre.name);
    const countries = movie.production_countries.map((country) => country.name);
    return {
      id: movie.id,
      title: movie.title,
      popularity: movie.popularity,
      runtime: movie.runtime,
      genres: genres,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      production_countries: countries
    };
  });
  return organizedDetails;
};

export const getMoreOrganizedMovieDetails = (movieDetails: MovieData[]): OrganizedMovieDetails[] => {
  const organizedDetails = movieDetails.map((movie) => {
    const genres = movie.genres.map((genre) => genre.name);
    const countries = movie.production_countries.map((country) => country.name);
    return {
      id: movie.id,
      title: movie.title,
      popularity: movie.popularity,
      runtime: movie.runtime,
      genres: genres[0],
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      production_countries: countries[0]
    };
  });
  return organizedDetails;
};
