import React from 'react';
import MovieItem from '../common/MovieItem';

const MovieDataList = ({ movieData }: { movieData: MovieData[] }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {movieData.map((movie: MovieData) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default MovieDataList;
