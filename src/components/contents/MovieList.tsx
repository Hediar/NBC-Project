'use client';
import { searchTMDB } from '@/api/tmdb';
import Search from '@/components/common/Search';
import Sort from '@/components/contents/Sort';
import { useEffect, useState } from 'react';

const MovieList = () => {
  const [sortingOption, setSortingOption] = useState('release_date');
  const [searchMovieValue, setSearchMovieValue] = useState('');
  const [filteredData, setFilterefData] = useState([]);
  console.log(sortingOption, searchMovieValue);
  useEffect(() => {
    // const test = async () => {
    //   const data = await searchTMDB('톰', 'person');
    //   console.log(data.results[0].known_for[0].name);
    // };
    // test();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <Sort sortingOption={sortingOption} setSortingOption={setSortingOption} />
        <Search searchMovieValue={searchMovieValue} setSearchMovieValue={setSearchMovieValue} />
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
