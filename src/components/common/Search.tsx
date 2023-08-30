'use client';

import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { searchReviewMovies } from '@/api/tmdb';

const Search = () => {
  const [searchMovies, setSearchMovies] = React.useState<TMDBSearchMovie[]>();
  const [searchMovie, setSearchMovie] = useState('');

  const debouncedHandleChange = debounce((value: string) => {
    const fetchDate = async () => {
      const { results } = await searchReviewMovies(value);
      setSearchMovies(results);
    };

    fetchDate();
  }, 300); // 300ms delay

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchMovie(value);
    debouncedHandleChange(value);

    if (!value) {
      setSearchMovies([]);
    }
  };

  const handleClick = (movie: TMDBSearchMovie) => {
    setSearchMovie(movie.title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debouncedHandleChange(searchMovie);
  };

  const isSearchStart = !!searchMovies;

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
          id="search"
          name="search"
          type="text"
          placeholder="영화 검색"
          value={searchMovie}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          검색
        </button>
      </form>
      <ul className="overflow-auto h-44">
        {isSearchStart &&
          searchMovies.map((movie, i: number) => (
            <li key={'searchMovieKey' + i}>
              <button type="button" onClick={() => handleClick(movie)}>
                {movie.title}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
