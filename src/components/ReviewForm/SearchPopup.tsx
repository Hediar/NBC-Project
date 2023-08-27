'use client';

import { searchReviewMovies } from '@/api/tmdb';
import { useReviewMovieStore } from '@/store/useReviewStore';
import React from 'react';

const SearchPopup = () => {
  const [searchMovies, setSearchMovies] = React.useState<TMDBSearchMovie[]>([]);

  const { saveSearchMovieId } = useReviewMovieStore();

  const searchMovie = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) return;
    const fetchDate = async () => {
      const { results } = await searchReviewMovies(value);
      setSearchMovies(results);
    };
    fetchDate();
  };

  const handleClick = (movieId: number) => {
    saveSearchMovieId(movieId);
  };

  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
        id="search"
        name="search"
        type="text"
        placeholder="영화 검색"
        onChange={searchMovie}
      />
      <ul>
        {searchMovies.map((movie, i: number) => (
          <li key={'searchMovieKey' + i}>
            <button type="button" onClick={() => handleClick(movie.id)}>
              {movie.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPopup;
