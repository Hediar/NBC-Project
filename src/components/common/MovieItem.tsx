/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import MovieButtons from './MovieButtons';

const MovieItem = ({ movie }: { movie: MovieData }) => {
  const [isOnHover, setIsOnHover] = useState(false);

  return (
    <div className="h-full flex gap-2 flex-col" id={movie.id.toString()}>
      <div className="relative h-5/6 w-full flex justify-center items-center overflow-hidden rounded-xl">
        <img
          className={` transfrom ease-in-out duration-200 w-44 h-full   ${
            isOnHover ? 'grayscale blur-sm scale-125 ' : ''
          }`}
          alt="poster"
          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          onMouseEnter={() => setIsOnHover(true)}
          onMouseOut={() => setIsOnHover(false)}
        />
        {isOnHover && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 items-center w-5/6"
            onMouseEnter={() => setIsOnHover(true)}
            onMouseLeave={() => setIsOnHover(false)}
          >
            <MovieButtons movieId={movie.id} title={movie.title} />
          </div>
        )}
      </div>
      <div className="h-1/6 w-full">
        <h4 className="text-sm font-bold">{movie.title}</h4>
        <div className="flex gap-2">
          <p className="text-xs">{movie.release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
