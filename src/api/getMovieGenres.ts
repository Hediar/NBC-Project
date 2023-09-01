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

export const sortByMostFrequent = (target: Array<string>, showNumber: number) => {
  const countsObject = {} as any;

  target.forEach((element) => {
    if (countsObject[element]) {
      countsObject[element]++;
    } else {
      countsObject[element] = 1;
    }
  });

  const sortedData = Object.keys(countsObject).sort((a, b) => countsObject[b] - countsObject[a]);

  return sortedData.slice(0, showNumber);
};
