/* eslint-disable @next/next/no-img-element */

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  movieData: MovieFetchResult;
  discoverMoviesWithGenreId: (movieGenres: string[], page: number) => Promise<MovieFetchResult[]>;
  genreIdArray: string[];
}

const DisplayInfiniteMovies = ({ movieData, discoverMoviesWithGenreId, genreIdArray }: Props) => {
  const [dataToProject, setDataToProject] = useState<MovieData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleScroll = (e: any) => {
    const container = e.target;
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth * 0.8) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const getMoreData = async (page: number) => {
      const data = await discoverMoviesWithGenreId(genreIdArray, page);
      const results = data[0].results;
      setDataToProject([...dataToProject, ...results]);
    };
    getMoreData(currentPage);
  }, [currentPage]);

  if (!dataToProject) return <>nothing</>;

  const content = dataToProject.map((movie) => {
    return (
      <Link href={'/detail/' + movie.id} key={movie.id} className="w-56 h-full flex flex-col gap-2 items-center">
        <img
          className="rounded-xl h-2/3 w-10/12"
          alt="poster"
          //w92, w154, w185, w342, w500, w780 등
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        />
        <div className="flex flex-col gap-1 w-full h-1/3">
          <h4 className="text-sm font-bold">{movie.title}</h4>
          <div className="flex gap-2">
            <p className="text-xs">{movie.release_date}</p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="overflow-hidden">
      <div className="overflow-scroll" onScroll={handleScroll}>
        <div className="INLINE_BOX h-96">{content}</div>
      </div>
    </div>
  );
};

export default DisplayInfiniteMovies;
