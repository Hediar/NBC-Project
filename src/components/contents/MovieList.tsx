/* eslint-disable @next/next/no-img-element */
'use client';

import { contentPageGetDataDiscover, contentPageGetDataSearch, searchTMDB } from '@/api/tmdb';
import Search from '@/components/common/Search';
import Sort from '@/components/contents/Sort';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import MovieDataList from './MovieDataList';

const MovieList = () => {
  const [sortingOption, setSortingOption] = useState<string>('popularity'); // 정렬 옵션
  const [searchType, setSearchType] = useState('movie'); // 검색 filter 옵션
  const [searchMovieValue, setSearchMovieValue] = useState('');
  const [filteredData, setFilterefData] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState<any>([]);

  const today = dayjs();
  const formattedCurrentDate = today.format('YYYY-MM-DD');

  const fetchMovieData = async (page: number) => {
    if (searchMovieValue) {
      // 검색 했을 때
      const data = await contentPageGetDataSearch(searchMovieValue, searchType, page);
      setDataList(data);
      const results = data.results;

      if (page === 1) {
        setFilterefData([...results]);
      } else {
        setFilterefData([...filteredData, ...results]);
      }
    } else {
      // 검색 x
      const data = await contentPageGetDataDiscover(sortingOption, formattedCurrentDate, page);
      setDataList(data);
      const results = data.results;
      if (page === 1) {
        setFilterefData([...results]);
      } else {
        setFilterefData([...filteredData, ...results]);
      }
    }
  };

  const fetchMore = () => {
    if (currentPage < dataList!.total_pages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    // 초기화
    setDataList([]);
    setCurrentPage(1);
    fetchMovieData(1);
  }, [sortingOption, searchMovieValue]);
  console.log('showdata', filteredData);

  useEffect(() => {
    fetchMovieData(currentPage);
  }, [currentPage, searchMovieValue]);

  let contents;

  if (!dataList) {
    contents = <>검색 결과가 없습니다.</>;
  } else {
    contents = <MovieDataList movieData={filteredData} />; // 검색x, 영화 검색
  }

  return (
    <div>
      <div className="flex justify-between h-20">
        <Sort sortingOption={sortingOption} setSortingOption={setSortingOption} />
        <Search
          searchMovieValue={searchMovieValue}
          setSearchMovieValue={setSearchMovieValue}
          searchType={searchType}
          setSearchType={setSearchType}
        />
      </div>
      <div className="p-8">{contents}</div>
      {currentPage < dataList?.total_pages && ( // 다음 페이지가 있는 경우에만 더보기 버튼 표시
        <div onClick={fetchMore} className="bg-blue-700 cursor-pointer text-center py-2 text-white">
          더보기
        </div>
      )}
    </div>
  );
};

export default MovieList;