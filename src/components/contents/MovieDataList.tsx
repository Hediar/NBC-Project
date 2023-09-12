import React from 'react';
import MovieItem from '../common/MovieItem';

const MovieDataList = ({ movieData }: { movieData: MovieData[] }) => {
  return (
    <div className="flex flex-wrap mx-5 p-3 gap-4 items-start justify-center sm:grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 2xl:mx-36">
      {movieData.map((movie: MovieData) => (
        <div className="gap-4 mb-2" key={movie.id}>
          <MovieItem movie={movie} key={movie.id} />
        </div>
      ))}
    </div>
  );
};

export default MovieDataList;
