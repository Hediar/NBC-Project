import Image from 'next/image';
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
    <div className="flex justify-between p-2 border-b">
      <div className="flex items-center relative">
        <div
          className="flex items-center"
          onClick={() => {
            setSortFilterOpen(!sortFilterOpen);
          }}
        >
          <Image
            className="cursor-pointer opacity-70 hover:opacity-100 transform hover:scale-110 hover:ease-out duration-200"
            alt="dropdown"
            src="/dropdown-arrow.svg"
            width={20}
            height={20}
          />
          {sortBy.text}
        </div>
        {sortFilterOpen && (
          <div className="absolute top-7 left-0 w-[5rem]">
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

      <div>
        <form
          className="flex gap-2 relative"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div
            className="w-[100px] flex items-center border p-1"
            onClick={() => {
              setSearchFilterOpen(!searchFilterOpen);
            }}
          >
            <span className="w-4/5">{searchBy.text}</span>
            <Image
              className="cursor-pointer opacity-70 hover:opacity-100 transform hover:scale-110 hover:ease-out duration-200"
              alt="dropdown"
              src="/dropdown-arrow.svg"
              width={20}
              height={20}
            />
          </div>

          {searchFilterOpen && (
            <div className="absolute top-7">
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
          <input
            name="discussion-searchbar"
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />
          <button onClick={handleSearchValSubmit}>검색</button>
        </form>
      </div>
    </div>
  );
};

export default DiscussionFilteringBox;
