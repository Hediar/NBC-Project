/* eslint-disable @next/next/no-img-element */
// 현재는 영화 장르 코드가 있어야 작동합니다. 추후 업데이트 예정

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import MovieItem from './MovieItem';

interface Props {
  movieData: MovieFetchResult;
  discoverMoviesWithGenreId: (movieGenres: string[], page: number) => Promise<MovieFetchResult[]>;
  genreIdArray: string[];
  ignoredList: string[];
}

const DisplayInfiniteMovies = ({ movieData, discoverMoviesWithGenreId, genreIdArray, ignoredList }: Props) => {
  const [dataToProject, setDataToProject] = useState<MovieData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOnHover, setIsOnHover] = useState<boolean>(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.target as HTMLDivElement;
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth * 0.8) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const getMoreData = async (page: number) => {
      const data = await discoverMoviesWithGenreId(genreIdArray, page);
      const results = data[0].results;
      const filteredResults = results.filter((movie) => !ignoredList.includes(movie.id.toString()));
      console.log(ignoredList);
      setDataToProject([...dataToProject, ...filteredResults]);
    };
    getMoreData(currentPage);
  }, [currentPage]);

  if (!dataToProject) return <>nothing</>;

  const content = dataToProject.map((movie) => <MovieItem key={movie.id} movie={movie} />);

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-scroll overflow-y-hidden" onScroll={handleScroll}>
        <div className="w-full INLINE_BOX h-72 mb-12 flex gap-6">{content}</div>
      </div>
    </div>
  );
};

export default DisplayInfiniteMovies;
