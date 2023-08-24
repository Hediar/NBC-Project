'use client';

import { searchReviewMovies } from '@/api/tmdb';
import { useReviewMovieStore } from '@/app/(store)/useReviewStore';
import React from 'react';

type Props = {};

const SearchPopup = (props: Props) => {
  const [searchMovies, setSearchMovies] = React.useState<any>([]);

  const { saveSearchMovieId }: any = useReviewMovieStore();

  const searchMovie = (e: any) => {
    const value = e.target.value;

    if (!value) return;
    const fetchDate = async () => {
      const { results } = await searchReviewMovies(value);
      setSearchMovies(results);
    };
    fetchDate();
  };

  const handleClick = (movieId: any) => {
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
        {searchMovies.map((movie: any, i: number) => (
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
