import { DropdownMenu } from '@/styles/icons/Icons24';
import { SearchLined } from '@/styles/icons/Icons32';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

interface Props {
  sortQuery: string;
}

interface FilterBy {
  text: string;
  id: string;
}

const DiscussionFilteringBox = ({ sortQuery = '' }: Props) => {
  const [sortFilterOpen, setSortFilterOpen] = useState<boolean>(false);
  const [searchFilterOpen, setSearchFilterOpen] = useState<boolean>(false);
  const searchByDropdownValues = [
    { text: '전체', id: 'all' },
    { text: '영화 제목', id: 'movie_title' },
    { text: '토론 제목', id: 'discussion_title' },
    { text: '내용', id: 'discussion_content' }
  ];
  const sortByDropdownValues = [
    { text: '최신순', id: 'new' },
    { text: '조회순', id: 'view' },
    { text: '투표순', id: 'vote' }
  ];
  const [searchBy, setSearchBy] = useState<FilterBy>(searchByDropdownValues[0]);
  const [searchVal, setSearchVal] = useState('');
  const [sortBy, setSortBy] = useState<FilterBy>(sortByDropdownValues.filter((obj) => obj.id.includes(sortQuery))[0]);
  const router = useRouter();
  const discussionUrl = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const filter = searchParams.get('filter');
  const sort = searchParams.get('sort');

  const handleSearchValSubmit = () => {
    if (sort) {
      router.push(`${discussionUrl.slice(0, -1)}1?search=${searchVal}&filter=${searchBy.id}&sort=${sort}`);
    } else {
      router.push(`${discussionUrl.slice(0, -1)}1?search=${searchVal}&filter=${searchBy.id}`);
    }
  };

  const handleSortBySubmit = (obj: FilterBy) => {
    if (search) {
      router.push(`${discussionUrl}?search=${search}&filter=${filter}&sort=${obj.id}`);
    } else {
      router.push(`${discussionUrl}?sort=${obj.id}`);
    }
  };

  return (
    <div className="flex justify-between p-2">
      <div className="flex items-center relative">
        <div
          className="w-[104px] h-11 pl-5 pr-2.5 py-2.5 bg-white rounded-xl border border-zinc-300 justify-start items-center gap-2 inline-flex"
          onClick={() => {
            setSortFilterOpen(!sortFilterOpen);
          }}
        >
          <div className="w-full text-neutral-800 text-base font-normal leading-snug">최신순</div>
          <DropdownMenu className="cursor-pointer opacity-70 hover:opacity-100 transform hover:scale-110 hover:ease-out duration-200" />
        </div>
        {sortFilterOpen && (
          <div className="absolute top-[40px] left-0 w-[5rem]">
            <ul className="border bg-white">
              {sortByDropdownValues.map((sortByObj) => {
                return (
                  <li
                    className="px-3 hover:bg-gray-200 cursor-pointer"
                    key={sortByObj.id}
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
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/discussion/regist`}
          className="border py-1 px-2 rounded-xl bg-gray-400 text-white hover:bg-gray-500"
        >
          글 작성
        </Link>
        <form
          className="flex gap-2 relative"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="w-[570px] h-[52px] relative bg-white rounded-xl border border-zinc-300">
            <div
              className="flex justify-between w-1/5 h-5 left-[20px] top-[16px] absolute text-neutral-800 text-base font-normal leading-snug"
              onClick={() => {
                setSearchFilterOpen(!searchFilterOpen);
              }}
            >
              <span>{searchBy.text}</span>
              <DropdownMenu className="cursor-pointer opacity-70 hover:opacity-100 transform hover:scale-110 hover:ease-out duration-200" />
            </div>
            <div className="w-px h-6 left-[148px] top-[14px] absolute bg-gray-200" />
            <div className="w-[343px] h-5 left-[165px] top-[16px] absolute text-zinc-300 text-base font-normal leading-snug">
              <input
                className="w-full text-black focus:outline-none"
                name="discussion-searchbar"
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
              />
            </div>
            <button className="w-8 h-8 left-[518px] top-[10px] absolute cursor-pointer" onClick={handleSearchValSubmit}>
              <SearchLined />
            </button>
          </div>

          {searchFilterOpen && (
            <div className="absolute top-[40px] left-5">
              <ul className="border bg-white">
                {searchByDropdownValues.map((searchByObj) => {
                  return (
                    <li
                      className="px-3 hover:bg-gray-200 cursor-pointer"
                      key={searchByObj.id}
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
