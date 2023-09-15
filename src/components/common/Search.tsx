'use client';

import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { searchTMDB } from '@/api/tmdb';
import { SearchLined } from '@/styles/icons/Icons32';
import Select from './Select';

const Search = ({
  searchMovieValue,
  setSearchMovieValue,
  searchType,
  setSearchType
}: {
  searchMovieValue: string;
  setSearchMovieValue: React.Dispatch<React.SetStateAction<string>>;
  searchType: string;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [searchResults, setSearchResults] = React.useState<MovieData[]>();
  const [searchInput, setSearchInput] = useState('');
  const [offsearchState, setOffSearchState] = useState(false);

  const debouncedHandleChange = debounce(async (value: string) => {
    if (!value) {
      setSearchResults([]);
      return;
    }

    let results;
    if (searchType === 'movie') {
      results = await searchTMDB(value, searchType);
    } else if (searchType === 'person') {
      results = await searchTMDB(value, searchType);
    }

    setSearchResults(results.results);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedHandleChange(value);
    setOffSearchState(false);
    if (!value) {
      setSearchInput('');
      setSearchResults([]);
    }
  };

  const handleSelectChange = (value: string) => {
    setSearchType(value);
    setSearchResults([]);
    setSearchInput('');
  };

  const handleClick = (item: MovieData) => {
    setOffSearchState(true);
    if (searchType === 'movie') {
      setSearchInput(item.title);
    } else if (searchType === 'person') {
      setSearchInput(item.name);
    }
    setSearchResults([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debouncedHandleChange(searchInput);
    setSearchMovieValue(searchInput); // 상위에서 사용하기 위해 set하는 값
    setOffSearchState(true);
  };

  return (
    <div className="pt-2 sm:pt-0">
      <form onSubmit={handleSubmit} className="flex select-search-form">
        <Select
          defaultValue="movie"
          onChange={handleSelectChange}
          options={[
            { value: 'movie', label: '영화' },
            { value: 'person', label: '인물' }
          ]}
        />
        <input
          className="custom_input"
          id="search"
          name="search"
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchInput}
          onChange={handleChange}
        />

        <button type="submit" className=" font-bold pl-4 rounded ml-2">
          <SearchLined />
        </button>
      </form>
      <ul
        className={`overflow-auto h-44 absolute w-full ${
          searchInput ? 'bg-white' : 'bg-transparent hidden'
        }  rounded z-10 transition-colors duration-300 ${offsearchState ? 'bg-transparent hidden' : ''}`}
      >
        {!!searchResults &&
          searchResults.map((result, i: number) => (
            <li key={`searchResultKey_${i}`}>
              <button type="button" onClick={() => handleClick(result)}>
                {searchType === 'movie' ? result.title : result.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Search;
