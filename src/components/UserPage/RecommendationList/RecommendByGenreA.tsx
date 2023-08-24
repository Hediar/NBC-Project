import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  movieData: any;
  gerne: string;
}

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

const RecommendByGenreA = ({ movieData, gerne }: Props) => {
  const movies: Movie[] = movieData.results;
  const content = movies.map((movie: Movie) => {
    return (
      <Link href={'/detail/' + movie.id} key={movie.id} className="w-56 h-full flex flex-col gap-2 ">
        <Image
          className="rounded-xl h-2/3 "
          alt="poster"
          width={200}
          height={300}
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
        <div className="flex flex-col gap-1 w-full h-1/3">
          <h4 className="text-sm">{movie.title}</h4>
          <div className="flex gap-2">
            <p className="text-xs">{movie.release_date}</p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="w-full h-96 flex flex-col items-center gap-4">
      <div className="w-10/12">
        <h2 className="inline-block text-xl bg-slate-300 p-3 rounded-xl">#{gerne}</h2>
      </div>
      <div className=" w-10/12 flex flex-wrap gap-3 h-full overflow-visible">{content}</div>
    </div>
  );
};

export default RecommendByGenreA;
// title;
// release_date;
// genre_ids;
// id;
// poster_path;
// vote_average;
