/* eslint-disable @next/next/no-img-element */

import { StarFill } from '@/styles/icons/Icons24';
import WatchLaterButton from './WatchLaterButton';
import Link from 'next/link';
import MovieLikes from '../MovieLikes/MovieLikes';

const MovieItem = ({ movie }: { movie: MovieData }) => {
  return (
    <>
      <div className="w-[240px] flex flex-col gap-3">
        <div className="relative">
          <img
            className="w-[240px] h-[360px] rounded-xl"
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt="poster"
          />
          <div className="bg-gray-800 bg-opacity-30 rounded-xl py-1 px-1 absolute top-4 right-4 flex flex-col gap-[6px] items-center">
            <WatchLaterButton movieId={movie.id} />
            <MovieLikes movieid={movie.id} />
          </div>
        </div>
        <Link href={`/detail/${movie.id}`} className="flex flex-col gap-1">
          <span className="font-bold">{movie.title}</span>
          <div className="flex gap-1 items-center">
            <span className="text-[14px]">{movie.release_date}</span>
          </div>
          <div className="flex gap-[6px] items-center">
            <StarFill />
            <span>{(movie.vote_average / 2).toFixed(1)}</span>
          </div>
        </Link>
        {/* <div className="providers"></div> */}
      </div>
    </>
  );
};

export default MovieItem;
