import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MovieDataList = ({ movieData }: { movieData: MovieData[] }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {movieData.map((movie: MovieData) => (
        <Link href={`/detail/${movie.id}`} key={movie.id}>
          <Image
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            width={500}
            height={500}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default MovieDataList;
