'use client';

import { searchReviewMovies } from '@/api/tmdb';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
  const [query, setQuery] = React.useState('');
  const [searchMovies, setSearchMovies] = React.useState<TMDBSearchMovie[]>();

  const { saveSearchMovieId } = useReviewMovieStore();
  const { closeSearchModal } = useSearchModalStore();

  const DATA_PER_PAGE: number = 12;
  const TMDB_PER_PAGE: number = 20;

  useEffect(() => {
    fetchData(query, currentPage);
  }, [currentPage]);

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) return;
    fetchData(value);
  }, 300);

  const fetchData = async (value: string, currentPage: number = 1) => {
    const searchStartNumber = (currentPage - 1) * DATA_PER_PAGE + 1;
    const searchEndNumber = currentPage * DATA_PER_PAGE;

    const searchStartPage = Math.ceil(searchStartNumber / TMDB_PER_PAGE);
    const searchEndPage = Math.ceil(searchEndNumber / TMDB_PER_PAGE);

    const sliceStartNum = (searchStartNumber % TMDB_PER_PAGE) - 1;
    let sliceEndNum = searchEndNumber % TMDB_PER_PAGE;
    if (sliceStartNum + DATA_PER_PAGE > sliceEndNum) sliceEndNum += 20;

    const getPageResults = async () => {
      if (searchStartPage == searchEndPage) {
        const { results, total_results } = await searchReviewMovies(value, searchStartPage);
        currentPage == 1 && setTotalPages(Math.ceil(total_results / DATA_PER_PAGE));
        return results;
      } else {
        const [startPromise, endPromise] = await Promise.all([
          searchReviewMovies(value, searchStartPage),
          searchReviewMovies(value, searchEndPage)
        ]);
        const results = [...startPromise.results, ...endPromise.results];
        return results;
      }
    };

    const results = await getPageResults();
    const slicedResults = results.slice(sliceStartNum, sliceEndNum);
    setSearchMovies(slicedResults);

    !isSearchStart && setIsSearchStart(true);
  };

  const handleClick = (movieId: number) => {
    saveSearchMovieId(movieId);

    closeSearchModal();
  };

  return (
    <div className="flex flex-col items-center mt-[26px] mb-[60px]">
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
            // .slice(currentPage * DATA_PER_PAGE - DATA_PER_PAGE, currentPage * DATA_PER_PAGE)
            .map((movie, i: number) => (
              <SearchMoviesItem key={'searchMovieKey' + i} movie={movie} handleClick={handleClick} />
            ))
        )}
      </ul>

      <Paging
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageRangeDisplayed={10}
      />
    </div>
  );
};

export default SearchMovies;
