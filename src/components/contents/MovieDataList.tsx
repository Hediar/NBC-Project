import React from 'react';
import MovieItem from '../common/MovieItem';

const MovieDataList = ({ movieData }: { movieData: MovieData[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movieData.map((movie: MovieData) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default MovieDataList;
