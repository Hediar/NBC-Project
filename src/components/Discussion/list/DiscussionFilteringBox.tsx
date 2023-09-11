'use client';

import { DropdownMenu } from '@/styles/icons/Icons24';
import { SearchLined } from '@/styles/icons/Icons32';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import DiscussionRegistBtn from './DiscussionRegistBtn';

interface FilterBy {
  text: string;
  title: string;
}

const DiscussionFilteringBox = () => {
  const [sortFilterOpen, setSortFilterOpen] = useState<boolean>(false);
  const [searchFilterOpen, setSearchFilterOpen] = useState<boolean>(false);
  const sortByDropdownValues = [
    { text: '최신순', title: 'new' },
    { text: '조회순', title: 'view' },
    { text: '투표순', title: 'vote' }
  ];
  const searchByDropdownValues = [
    { text: '전체', title: 'all' },
    { text: '영화 제목', title: 'movie_title' },
    { text: '토론 제목', title: 'discussion_title' },
    { text: '내용', title: 'discussion_content' }
  ];
  const [searchBy, setSearchBy] = useState<FilterBy>(searchByDropdownValues[0]);
  const [searchVal, setSearchVal] = useState('');
  const [sortBy, setSortBy] = useState<FilterBy>(sortByDropdownValues[0]);
  const router = useRouter();
  const discussionUrl = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const filter = searchParams.get('filter');
  const sort = searchParams.get('sort');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchValSubmit = () => {
    if (searchInputRef.current) {
      const isSearchVal = searchInputRef.current.value;

      if (!isSearchVal) searchInputRef.current!.focus();
    }
    if (sort) {
      router.push(`${discussionUrl}?search=${searchVal}&filter=${searchBy.title}&sort=${sort}`);
    } else {
      router.push(`${discussionUrl}?search=${searchVal}&filter=${searchBy.title}`);
    }
  };

  const handleSortBySubmit = (obj: FilterBy) => {
    if (search) {
      router.push(`${discussionUrl}?search=${search}&filter=${filter}&sort=${obj.title}`);
    } else {
      router.push(`${discussionUrl}?sort=${obj.title}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-5 justify-between p-2 mb-4 relative">
      <div className="w-full sm:w-1/3 flex gap-5 items-center relative">
        <div
          className="w-[104px] h-11 pl-5 pr-2.5 py-2.5 bg-white rounded-xl border border-zinc-300 justify-start items-center gap-2 inline-flex"
          onClick={() => {
            setSortFilterOpen(!sortFilterOpen);
          }}
        >
          <div className="w-full text-neutral-800 text-base font-normal leading-snug">{sortBy.text}</div>
          <DropdownMenu className="cursor-pointer opacity-70 hover:opacity-100 transform hover:scale-110 hover:ease-out duration-200" />
        </div>
        {sortFilterOpen && (
          <div className="absolute top-[40px] left-0 w-[5rem] z-10">
            <ul className="border bg-white">
              {sortByDropdownValues.map((sortByObj) => {
                return (
                  <li
                    className="px-3 hover:bg-gray-200 cursor-pointer"
                    key={sortByObj.title}
                    onClick={() => {
                      setSortBy(sortByObj);
                      setSortFilterOpen(false);
                      handleSortBySubmit(sortByObj);
                    }}
                  >
                    {sortByObj.text}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <DiscussionRegistBtn />
      </div>

      <div className="flex items-center gap-2">
        <form
          className="flex gap-2 relative"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="min-w-[300px] mx-auto sm:w-[570px] h-[52px] relative bg-white rounded-xl border border-zinc-300">
            <div
              className="flex justify-between w-[100px] sm:w-1/5 h-5 left-[20px] top-[16px] absolute text-neutral-800 text-base font-normal leading-snug"
              onClick={() => {
                setSearchFilterOpen(!searchFilterOpen);
              }}
            >
              <span>{searchBy.text}</span>
              <DropdownMenu className="cursor-pointer opacity-70 hover:opacity-100 transform hover:scale-110 hover:ease-out duration-200" />
            </div>
            <div className="w-px h-6 left-[120px] sm:left-[148px] top-[14px] absolute bg-gray-200" />
            <div className="w-[200px] sm:w-[343px] h-5 left-[140px] top-[16px] absolute text-zinc-300 text-base font-normal leading-snug pr-10">
              <input
                ref={searchInputRef}
                className="w-[70%] sm:w-full text-black focus:outline-none placeholder:text-xs sm:placeholder:text-base"
                name="discussion-searchbar"
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
              />
            </div>
            <button className="w-8 h-8 top-[10px] absolute right-1 cursor-pointer" onClick={handleSearchValSubmit}>
              <SearchLined />
            </button>
          </div>

          {searchFilterOpen && (
            <div className="absolute top-[40px] left-5 z-10">
              <ul className="border bg-white">
                {searchByDropdownValues.map((searchByObj) => {
                  return (
                    <li
                      className="px-3 hover:bg-gray-200 cursor-pointer"
                      key={searchByObj.title}
                      onClick={() => {
                        setSearchBy(searchByObj);
                        setSearchFilterOpen(false);
                      }}
                    >
                      {searchByObj.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DiscussionFilteringBox;
