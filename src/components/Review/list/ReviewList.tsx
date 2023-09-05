'use client';

import { contentPageGetDataDiscover, contentPageGetDataSearch, searchTMDB } from '@/api/tmdb';
import Search from '@/components/common/Search';
import Sort from '@/components/contents/Sort';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
// import MovieDataList from './MovieDataList';

const ReviewList = () => {
  const [sortingOption, setSortingOption] = useState<string>('popularity'); // 정렬 옵션
  const [searchType, setSearchType] = useState('movie'); // 검색 filter 옵션
  const [searchMovieValue, setSearchMovieValue] = useState('');
  const [filteredData, setFilterefData] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState<any>();

  const today = dayjs();
  const formattedCurrentDate = today.format('YYYY-MM-DD');

  const fetchMovieData = async (page: number) => {
    if (searchMovieValue) {
      // 검색 했을 때
      const data = await contentPageGetDataSearch(searchMovieValue, searchType, page);
      setDataList(data);
      if (searchType === 'movie') {
        const results = data.results;
        if (page === 1) {
          setFilterefData([...results]);
        } else {
          setFilterefData([...filteredData, ...results]);
        }
      } else {
        const results = data.results[0].known_for;
        if (page === 1) {
          setFilterefData([...results]);
        } else {
          setFilterefData([...filteredData, ...results]);
        }
        console.log('영화데이터', results);
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

  const sortData = (data: TMDBSearchMovie[], sortingOption: string): TMDBSearchMovie[] => {
    switch (sortingOption) {
      case 'popularity':
        return data.slice().sort((a, b) => b.popularity - a.popularity);
      case 'primary_release_date':
        return data.slice().sort((a, b) => dayjs(b.release_date).diff(dayjs(a.release_date)));
      case 'vote_average':
        return data.slice().sort((a, b) => b.vote_average - a.vote_average);
      default:
        return data;
    }
  };

  const fetchMore = () => {
    if (currentPage < dataList!.total_pages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (searchMovieValue) {
      const sortedMovies = sortData(filteredData, sortingOption);
      setFilterefData(sortedMovies);
    } else {
      // 초기화
      setDataList([]);
      setCurrentPage(1);
      fetchMovieData(1);
    }
  }, [sortingOption]);

  useEffect(() => {
    setDataList([]);
    setCurrentPage(1);
    fetchMovieData(1);
  }, [searchMovieValue]);

  useEffect(() => {
    fetchMovieData(currentPage);
  }, [currentPage]);

  let contents;

  if (!dataList) {
    contents = <>검색 결과가 없습니다.</>;
  } else {
    // contents = <MovieDataList movieData={filteredData} />; // 검색x, 영화 검색
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

export default ReviewList;