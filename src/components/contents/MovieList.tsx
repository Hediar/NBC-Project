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

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [dataList, setDataList] = useState<any>(); // 영화 목록을 상태로 관리
  console.log(sortingOption, searchMovieValue);

  const today = dayjs();
  const formattedCurrentDate = today.format('YYYY-MM-DD');

  const fetchMovieData = async (page: number) => {
    if (searchMovieValue) {
      console.log('검색');
      const data = await contentPageGetDataSearch(searchMovieValue, searchType, page);

      setDataList(data);
    } else {
      console.log('검색x', sortingOption, formattedCurrentDate, page);
      const data = await contentPageGetDataDiscover(sortingOption, formattedCurrentDate, page);

      setDataList(data);
    }
    if (page === 1) {
      console.log('test', dataList);
      setFilterefData(dataList!.results); // 첫 페이지일 경우 데이터를 설정
    } else if (page !== 1 && page < dataList!.total_pages) {
      setFilterefData((prevMovies) => [...prevMovies, ...dataList!.results]); // 다음 페이지일 경우 기존 데이터에 추가
    }
  };

  const fetchMore = () => {
    if (currentPage < dataList!.total_pages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } // 다음 페이지 로드
  };

  const handleSortingChange = (value: string) => {
    setSortingOption(value);
    setCurrentPage(1); // 정렬 옵션 변경 시 첫 페이지로 초기화
  };

  useEffect(() => {
    fetchMovieData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    handleSortingChange(sortingOption);
  }, [sortingOption]);

  let contents;

  if (!dataList) {
    contents = <>검색 결과가 없습니다.</>;
  } else {
    contents = filteredData.map((movie: MovieData) => {
      return (
        <Link href={'/detail/' + movie.id} key={movie.id} className="w-56 h-full flex flex-col gap-2 items-center">
          <img
            className="rounded-xl h-2/3 w-10/12"
            alt="poster"
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          />
          {movie.id}
          <div className="flex flex-col gap-1 w-full h-1/3">
            <h4 className="text-sm font-bold">{movie.title}</h4>
            <div className="flex gap-2">
              <p className="text-xs">{movie.release_date}</p>
            </div>
          </div>
        </Link>
      );
    });
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
      <div>{contents}</div>
      <div onClick={fetchMore} className="bg-blue-700">
        더보기
      </div>
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
