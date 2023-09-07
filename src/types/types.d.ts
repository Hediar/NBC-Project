import { StringLiteral } from 'typescript';

//
declare global {
  interface Params {
    movieId: string;
    pageNum: string;
    search: string;
    discussionId: string;
  }

  interface TrailerData {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: String;
    id: string;
  }

  interface MovieGenre {
    id: number | string;
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
    genres: MovieGenre[];
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
    name: string;
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
    movieid: string | number;
    user_id: string[];
  }

  interface ReviewsTable {
    category: Json | null;
    content: string;
    date: Date | string | null;
    keyword: string[] | [] | undefined;
    movieid: string;
    review: string;
    reviewid?: string;
    review_title?: string;
    userid: string;
    created_at?: string;
    rating?: number;
  }

  interface TMDBSearchMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  interface DiscussionPost {
    post_id: number;
    created_at: string;
    user_id: string;
    title: string;
    content: string;
    movie_id: string;
    movie_title: string;
    movie_imgUrl: string;
    movie_genreIds: number[];
    vote_count: number;
    view_count: number;
    comment_count: number;
  }

  interface DiscussionOption {
    option_id: number;
    post_id: number;
    content: string;
    count: number;
  }

  interface DiscussionUser {
    id: number;
    user_id: string;
    option_id: number;
    post_id: number;
  }

  interface MovieLikesTable {
    movieid: string | Number;
    user_id: string[];
  }
  interface MovieIgnoredTable {
    userid: string;
    ignored_movies: string[];
  }
  interface MovieFetchResult {
    page: number;
    results: MovieData[];
    total_pages: number;
    total_results: number;
  }
  interface PersonFetchResult {
    page: number;
    results: TMDBSearchPerson[];
    total_pages: number;
    total_results: number;
  }
  // interface ReviewsTable {
  //   category: Json | null;
  //   content: string;
  //   date: Date | string | null;
  //   keyword: string[] | [] | undefined;
  //   movieid: string;
  //   review: string;
  //   reviewid?: string;
  //   review_title?: string;
  //   userid: string;
  // }

  // interface TMDBSearchMovie {
  //   adult: boolean;
  //   backdrop_path: string;
  //   genre_ids: number[];
  //   id: number;
  //   original_language: string;
  //   original_title: string;
  //   overview: string;
  //   popularity: number;
  //   poster_path: string;
  //   release_date: string;
  //   title: string;
  //   video: boolean;
  //   vote_average: number;
  //   vote_count: number;
  // }

  // interface DiscussionPost {
  //   post_id: number;
  //   created_at: string;
  //   user_id: string;
  //   title: string;
  //   content: string;
  // }
  // interface DiscussionOption {
  //   option_id: number;
  //   post_id: number;
  //   content: string;
  //   count: number;
  // }

  interface SortingProps {
    options: { value: string; label: string }[];
    selectedOption: string;
    onChange: (value: string) => void;
  }

  interface TMDBSearchPersonMovie {
    adult: boolean;
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
  }

  interface TMDBSearchPerson {
    adult: boolean;
    gender: number;
    id: number;
    known_for: TMDBSearchPersonMovie[];
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;

    profile_path: string;
  }

  type OrganizedMovieDetails = {
    id: number;
    title: string;
    popularity: number;
    runtime: number;
    genres: string[] | string;
    vote_average: number;
    release_date: string;
    production_countries: string[] | string;
  };

  interface DiscussionCommentsData {
    content: string;
    created_at: string;
    id: string;
    post_id: number;
    profiles: {
      username: string;
      avatar_url: string;
    };
    user_id: string;
    discussion_comments_likes: {
      comments_id: string;
      created_at: string;
      id: number;
      user_id: string;
    };
    user_has_liked_comment: boolean;
    likes: number;
  }
}
