interface MovieGenres {
  id: string;
  name: string;
}

export const getMovieGenresByName = (movieData: Partial<MovieData>[]) => {
  const movieGenresMix: Array<Array<MovieGenres>> = movieData.map((movie: any) => movie.genres);
  const allGenres = movieGenresMix.flatMap((genres) => genres.map((genre) => genre.name));
  return allGenres;
};

export const getMovieGenresById = (movieData: Partial<MovieData>[]) => {
  const movieGenresMix: Array<Array<MovieGenres>> = movieData.map((movie: any) => movie.genres);
  const allGenres = movieGenresMix.flatMap((genres) => genres.map((genre) => genre.id));
  return allGenres;
};

export const sortMostFrequentGenres = (allGenres: Array<string>, howManyGenres: number) => {
  const genreCounts = {} as any;
  allGenres.forEach((genre) => {
    if (genreCounts[genre]) {
      genreCounts[genre]++;
    } else {
      genreCounts[genre] = 1;
    }
  });
  const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);

  return sortedGenres.slice(0, howManyGenres);
};
