'use client';

import { searchReviewMovies } from '@/api/tmdb';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';
import React from 'react';

const SearchMovies = () => {
  const [searchMovies, setSearchMovies] = React.useState<TMDBSearchMovie[]>();

  const { saveSearchMovieId } = useReviewMovieStore();
  const { closeSearchModal } = useSearchModalStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) return;
    const fetchDate = async () => {
      const { results } = await searchReviewMovies(value);
      setSearchMovies(results);
      console.log('검색 테스트 ========> ', results);
    };
    fetchDate();
  };

  const handleClick = (movieId: number) => {
    saveSearchMovieId(movieId);
    closeSearchModal();
  };

  const isSearchStart = !!searchMovies;
  const isSearchNull = isSearchStart && !searchMovies.length;

  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
        id="search"
        name="search"
        type="text"
        placeholder="영화 검색"
        onChange={handleChange}
      />
      <ul className="overflow-auto h-44">
        {!isSearchStart && <li>리뷰 남기실 콘텐츠를 검색해 주세요</li>}
        {isSearchNull && <li>검색결과가 없습니다</li>}
        {isSearchStart &&
          searchMovies.map((movie, i: number) => (
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

export default SearchMovies;
