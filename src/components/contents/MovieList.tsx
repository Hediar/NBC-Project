/* eslint-disable @next/next/no-img-element */
'use client';

import { contentPageGetDataDiscover, contentPageGetDataSearch, searchTMDB } from '@/api/tmdb';
import Search from '@/components/common/Search';
import Sort from '@/components/contents/Sort';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const MovieList = () => {
  const [sortingOption, setSortingOption] = useState<string>('primary_release_date');
  const [searchType, setSearchType] = useState('movie');
  const [searchMovieValue, setSearchMovieValue] = useState('');
  const [filteredData, setFilterefData] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState<any>([]);

  const today = dayjs();
  const formattedCurrentDate = today.format('YYYY-MM-DD');

  const fetchMovieData = async (page: number) => {
    // fetchMovieData 함수 수정
    if (searchMovieValue) {
      const data = await contentPageGetDataSearch(searchMovieValue, searchType, page);
      setDataList(data);
      const results = data.results;
      setFilterefData([...filteredData, ...results]);
    } else {
      const data = await contentPageGetDataDiscover(sortingOption, formattedCurrentDate, page);
      setDataList(data);
      const results = data.results;
      setFilterefData([...filteredData, ...results]);
    }
  };

  const fetchMore = () => {
    if (currentPage < dataList!.total_pages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchMovieData(currentPage);
  }, [currentPage, sortingOption, searchMovieValue, searchType]); // 검색 타입이나 검색어가 바뀔 때도 데이터를 가져옴

  useEffect(() => {
    setCurrentPage(1); // 정렬 옵션이 변경될 때 첫 페이지로 초기화
  }, [sortingOption, searchMovieValue, searchType]);

  let contents;

  if (!dataList) {
    contents = <>검색 결과가 없습니다.</>;
  } else {
    contents = (
      <div className="grid grid-cols-4 gap-4">
        {filteredData.map((movie: MovieData) => (
          <Link href={`/detail/${movie.id}`} key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <Sort sortingOption={sortingOption} setSortingOption={setSortingOption} />
        <Search
          searchMovieValue={searchMovieValue}
          setSearchMovieValue={setSearchMovieValue}
          searchType={searchType}
          setSearchType={setSearchType}
        />
      </div>
      <div className="p-5">{contents}</div>
      {currentPage < dataList?.total_pages && ( // 다음 페이지가 있는 경우에만 더보기 버튼 표시
        <div onClick={fetchMore} className="bg-blue-700 cursor-pointer text-center py-2 text-white">
          더보기
        </div>
      )}
    </div>
  );
};

export default MovieList;
/**
 * 메모
 * 1. 인기순
 * '${process.env.NEXT_PUBLIC_TMDB_BASE_URL}discover/movie?include_adult=false&include_video=false&language=ko-Kr&page=1&sort_by=popularity.desc'
 * 
 * 2. 최신순 
 * ${process.env.NEXT_PUBLIC_TMDB_BASE_URL}discover/movie?include_adult=false&include_video=false&language=ko-Kr&page=1&sort_by=release_date.desc

 * 3. 별점순
 * ${process.env.NEXT_PUBLIC_TMDB_BASE_URL}discover/movie?include_adult=false&include_video=false&language=ko-Kr&page=1&sort_by=vote_average.desc
 * 
 * 최종 필터링 url
 * `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${pageparam}&sort_by=${sortby}.desc&with_genres=${genreId}`
 * 
 * 검색 눌렀을 때? 
 * 1. 제목기준
 * 
 * 2. 인물기준 
 */
