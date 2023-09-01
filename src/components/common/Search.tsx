'use client';

import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { searchTMDB } from '@/api/tmdb';

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
  const [searchResults, setSearchResults] = React.useState<any[]>();
  const [searchInput, setSearchInput] = useState('');

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

    if (!value) {
      setSearchResults([]);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setSearchType(selectedType);
    setSearchResults([]);
    setSearchInput('');
  };

  const handleClick = (item: any) => {
    // console.log(item);
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
  };

  const isSearchStart = !!searchResults;

  return (
    <div className="w-1/3">
      <form onSubmit={handleSubmit} className="flex">
        <select value={searchType} onChange={handleSelectChange} className="border rounded px-2 py-1">
          <option value="movie">영화</option>
          <option value="person">인물</option>
        </select>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
          id="search"
          name="search"
          type="text"
          placeholder="검색"
          value={searchInput}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          검색
        </button>
      </form>
      <ul
        className={`overflow-auto h-44 absolute w-full bg-${
          searchInput ? 'white' : 'transparent'
        }  rounded z-10 transition-colors duration-300`}
      >
        {isSearchStart &&
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
