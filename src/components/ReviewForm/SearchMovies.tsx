'use client';

import { searchReviewMovies } from '@/api/tmdb';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';
import React, { useState } from 'react';
import Paging from '../common/Paging';

const SearchMovies = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const dataPerPage: number = 3;

  const [searchMovies, setSearchMovies] = React.useState<TMDBSearchMovie[]>();
  const [searchValue, setSearchValue] = useState('');
  const { saveSearchMovieId } = useReviewMovieStore();
  const { closeSearchModal } = useSearchModalStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) return;
    const fetchData = async () => {
      const { results } = await searchReviewMovies(value);

      const total_pages = Math.ceil(results.length / dataPerPage);
      setSearchMovies(results);
      setTotalPages(total_pages);
    };

    fetchDate();
    setSearchValue(value);
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
        value={searchValue}
        onChange={handleChange}
      />
      <ul className="overflow-auto h-44">
        {!isSearchStart && <li>리뷰 남기실 콘텐츠를 검색해 주세요</li>}
        {isSearchNull && <li>검색결과가 없습니다</li>}
        {isSearchStart &&
          searchMovies
            .slice(currentPage * dataPerPage - dataPerPage, currentPage * dataPerPage)
            .map((movie, i: number) => (
              <li key={'searchMovieKey' + i}>
                <button type="button" onClick={() => handleClick(movie.id)}>
                  {movie.title}
                </button>
              </li>
            ))}
      </ul>

      <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default SearchMovies;
