'use client';

import { searchReviewMovies } from '@/api/tmdb';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';
import React from 'react';
import Paging from '../common/Paging';
import SearchMoviesItem from './SearchMoviesItem';

const SearchMovies = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const dataPerPage: number = 3;

  const [searchMovies, setSearchMovies] = React.useState<TMDBSearchMovie[]>();
  const { saveSearchMovieId } = useReviewMovieStore();
  const { closeSearchModal } = useSearchModalStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) return;
    const fetchData = async () => {
      const { results } = await searchReviewMovies(value);
      setSearchMovies(results);

      const total_pages = Math.ceil(results.length / dataPerPage);
      setTotalPages(total_pages);
    };
    fetchData();
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
      <ul className={`overflow-auto h-44 grid grid-cols-${dataPerPage} gap-4 mt-2 p-2`}>
        {!isSearchStart && <li>리뷰 남기실 콘텐츠를 검색해 주세요</li>}
        {isSearchNull && <li>검색결과가 없습니다</li>}
        {isSearchStart &&
          searchMovies
            .slice(currentPage * dataPerPage - dataPerPage, currentPage * dataPerPage)
            .map((movie, i: number) => (
              <SearchMoviesItem key={'searchMovieKey' + i} movie={movie} handleClick={handleClick} />
            ))}
      </ul>

      <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default SearchMovies;
