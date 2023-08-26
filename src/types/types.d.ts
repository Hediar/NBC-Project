import { StringLiteral } from 'typescript';

declare global {
  interface Params {
    movieId: string;
    pageNum: string;
    search: string;
    discussionId: string;
  }
  interface MovieGenre {
    id: number;
    name: string;
  }

  interface MovieProvider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }

  interface MovieBackdropImage {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }

  interface TMDBCreditCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }

  interface TMDBCreditCrew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
  }

  interface MovieData {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
      id: number;
      name: string;
      poster_path: string;
      backdrop_path: string;
    };
    budget: number;
    genre_ids: number[];
    homepage?: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
    production_countries: { iso_3166_1: string; name: string }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    trailerKeys: string[];
    watchProviders: { link: string; buy: MovieProvider[]; rent: MovieProvider[] };
    backdropImages: MovieBackdropImage[];
    appearences: TMDBCreditCast[];
    productions: TMDBCreditCrew[];
  }

  interface MovieLikesTable {
    movieid: string | Number;
    user_id: string[];
  }

  interface MovieFetchResult {
    page: number;
    results: MovieData[];
    total_pages: number;
    total_results: number;
  }
}
