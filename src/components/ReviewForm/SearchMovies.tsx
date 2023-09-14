'use client';

import { searchReviewMovies } from '@/api/tmdb';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Paging from '../common/Paging';
import SearchMoviesItem from './SearchMoviesItem';
import { debounce } from 'lodash';
import { SearchLined } from '@/styles/icons/Icons32';

type Props = {
  isSearchStart: boolean;
  setIsSearchStart: Dispatch<SetStateAction<boolean>>;
};

const SearchMovies = ({ isSearchStart, setIsSearchStart }: Props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const dataPerPage: number = 4;

  const [searchMovies, setSearchMovies] = React.useState<TMDBSearchMovie[]>();
  const { saveSearchMovieId } = useReviewMovieStore();
  const { closeSearchModal } = useSearchModalStore();

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) return;
    const fetchData = async () => {
      const { results } = await searchReviewMovies(value);
      setSearchMovies(results);
      !isSearchStart && setIsSearchStart(true);

      const total_pages = Math.ceil(results.length / dataPerPage);
      setTotalPages(total_pages);
    };
    fetchData();
  }, 300);

  const handleClick = (movieId: number) => {
    saveSearchMovieId(movieId);

    closeSearchModal();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center mt-[26px] mb-[60px]">
      <form className="search-form" onSubmit={handleSubmit}>
        <input className="custom_input" type="text" placeholder="검색" onChange={handleChange} />
        <button>
          <SearchLined />
        </button>
      </form>

      <ul
        className={`overflow-auto grid grid-cols-1 gap-5 w-full min-h-[6rem] mt-[30px] sm:grid-cols-2 lg:grid-cols-4`}
      >
        {!isSearchStart ? (
          <li className="col-span-4 display-[inherit] grid items-center text-center text-neutral-800 text-3xl font-bold leading-10">
            리뷰 남기실 콘텐츠를 검색해 주세요
          </li>
        ) : searchMovies?.length == 0 ? (
          <li className="col-span-4 display-[inherit] grid items-center text-center text-neutral-800 text-3xl font-bold leading-10">
            검색결과가 없습니다
          </li>
        ) : (
          searchMovies!
            .slice(currentPage * dataPerPage - dataPerPage, currentPage * dataPerPage)
            .map((movie, i: number) => (
              <SearchMoviesItem key={'searchMovieKey' + i} movie={movie} handleClick={handleClick} />
            ))
        )}
      </ul>

      <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default SearchMovies;
