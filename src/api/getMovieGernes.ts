interface MovieGenres {
  id: string;
  name: string;
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: string | number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: null;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const getMovieGenresByName = (movieData: Partial<MovieDetail>[]) => {
  const movieGenresMix: Array<Array<MovieGenres>> = movieData.map((movie: any) => movie.genres);
  const allGenres = movieGenresMix.flatMap((genres) => genres.map((genre) => genre.name));
  return allGenres;
};

export const getMovieGenresById = (movieData: Partial<MovieDetail>[]) => {
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
