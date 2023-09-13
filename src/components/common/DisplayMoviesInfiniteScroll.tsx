/* eslint-disable @next/next/no-img-element */
// 현재는 영화 장르 코드가 있어야 작동합니다. 추후 업데이트 예정

'use client';

import { useEffect, useState } from 'react';
import MovieItem from './MovieItem';
import { debounce } from 'lodash';
import SkeletonMovieItem from './skeleton/MovieItem';

interface Props {
  movieData: MovieFetchResult;
  discoverMoviesWithGenreId: (movieGenres: string[], page: number) => Promise<MovieFetchResult[]>;
  genreIdArray: string[];
  ignoredList: string[];
}

const DisplayInfiniteMovies = ({ movieData, discoverMoviesWithGenreId, genreIdArray, ignoredList }: Props) => {
  const [dataToProject, setDataToProject] = useState<MovieDetailData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [content, setContent] = useState<JSX.Element[]>([]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.target as HTMLDivElement;
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth * 0.8) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (dataToProject.length < 5) {
      setCurrentPage(currentPage + 1);
    }
  }, []);

  useEffect(() => {
    const getMoreData = async (page: number) => {
      const data = await discoverMoviesWithGenreId(genreIdArray, page);
      const results = data[0].results;
      const filteredResults = results.filter((movie) => !ignoredList.includes(movie.id.toString()));
      setDataToProject([...dataToProject, ...filteredResults]);
    };
    getMoreData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (dataToProject.length === 0) {
      setContent([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, index) => <SkeletonMovieItem key={index} />));
    } else if (dataToProject.length > 0) {
      setTimeout(() => {
        setContent(dataToProject.map((movie) => <MovieItem key={movie.id} movie={movie} />));
      }, 2000);
    }
  }, [dataToProject]);

  return (
    <div className="overflow-x-scroll scroll-smooth overflow-y-hidden " onScroll={debounce(handleScroll, 300)}>
      <div className="w-full INLINE_BOX mb-12 flex gap-6">{content}</div>
    </div>
  );
};

export default DisplayInfiniteMovies;
