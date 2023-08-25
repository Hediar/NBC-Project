'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Props {
  movieData: any;
  loadMoreFunction: any;
  genreIdArray?: string[];
}

const DisplayInfiniteMovies = ({ movieData, loadMoreFunction, genreIdArray }: Props) => {
  const [dataToProject, setDataToProject] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleScroll = (e: any) => {
    const container = e.target;
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth * 0.8) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    const getMoreData = async (page: number) => {
      const data = await loadMoreFunction(genreIdArray, page);
      const results = data[0].results;
      setDataToProject([...dataToProject, ...results]);
    };
    getMoreData(currentPage);
  }, [currentPage]);

  if (!dataToProject) return <>nothing</>;

  const content = dataToProject.map((movie: Movie) => {
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

/**
 * 
 * loadMoreFunction()의 결과
 * (discoverMoviesWithGenreId)
 * [
  {
    page: 2,
    results: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object]
    ],
    total_pages: 1010,
    total_results: 20199
  }
]
 * 
 * 
 */
