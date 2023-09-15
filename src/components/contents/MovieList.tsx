'use client';

import { getMovieListDataSearch, getMovieListNotSearch } from '@/api/tmdb';
import Search from '@/components/common/Search';
import Sort from '@/components/contents/Sort';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import MovieDataList from './MovieDataList';
import MovieListSkeleton from './MovieListSkeleton';

const MovieList = () => {
  const [sortingOption, setSortingOption] = useState<string>('popularity'); // 정렬 옵션
  const [searchType, setSearchType] = useState('movie'); // 검색 filter 옵션
  const [searchMovieValue, setSearchMovieValue] = useState('');
  const [filteredData, setFilterefData] = useState<MovieData[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState<MovieFetchResult | PersonFetchResult | null>();

  const today = dayjs();
  const formattedCurrentDate = today.format('YYYY-MM-DD');

  const fetchMovieData = async (page: number) => {
    if (searchMovieValue) {
      // 검색 했을 때
      const data = await getMovieListDataSearch(searchMovieValue, searchType, page);

      setDataList(data);
      if (data.results) {
        if (searchType === 'movie') {
          const results = data.results;
          if (page === 1) {
            setFilterefData([...results]);
          } else {
            setFilterefData([...filteredData, ...results]);
          }
        } else {
          const filteredResults = (data.results[0]?.known_for || []).filter((item: TMDBSearchPersonMovie) => {
            return item.media_type !== 'tv';
          });

          if (page === 1) {
            setFilterefData([...filteredResults]);
          } else {
            setFilterefData([...filteredData, ...filteredResults]);
          }
        }
      }
    } else {
      // 검색 x
      const data = await getMovieListNotSearch(sortingOption, formattedCurrentDate, page);
      setDataList(data);
      const results = data.results || [];
      if (page === 1) {
        setFilterefData([...results]);
      } else {
        setFilterefData([...filteredData, ...results]);
      }
    }
  };

  const sortData = (data: MovieData[], sortingOption: string): MovieData[] => {
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
      setDataList(null);
      setCurrentPage(1);
      fetchMovieData(1);
    }
  }, [sortingOption]);

  useEffect(() => {
    setDataList(null);
    setCurrentPage(1);
    fetchMovieData(1);
  }, [searchMovieValue]);

  useEffect(() => {
    fetchMovieData(currentPage);
  }, [currentPage]);

  let contents;

  if (dataList?.results) {
    contents = <MovieDataList movieData={filteredData} />; // 검색x, 영화 검색
  } else {
    contents = (
      <>
        <MovieListSkeleton />
      </>
    );
  }

  return (
    <div className="p-5 sm:p-16 flex-wrap">
      <div className="flex flex-wrap justify-between items-center">
        <Sort sortingOption={sortingOption} setSortingOption={setSortingOption} />
        <Search
          searchMovieValue={searchMovieValue}
          setSearchMovieValue={setSearchMovieValue}
          searchType={searchType}
          setSearchType={setSearchType}
        />
      </div>
      <div className="p-8">{contents}</div>
      {dataList &&
        currentPage < dataList.total_pages && ( // 다음 페이지가 있는 경우에만 더보기 버튼 표시
          <div onClick={fetchMore} className="full_button">
            <div className="inline-flex items-center justify-center gap-1 px-5 py-2">더보기</div>
          </div>
        )}
    </div>
  );
};

export default MovieList;
