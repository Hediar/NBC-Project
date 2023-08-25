import React from 'react';

const NumberOfMoviesWatched = ({ numberOfMoviesWatched }: { numberOfMoviesWatched: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-gray-300 w-1/3 h-40 rounded-2xl">
      <p className="text-xl">내가 지금까지 본 영화</p>
      <p className="text-lg text-gray-700">{numberOfMoviesWatched}개</p>
    </div>
  );
};

export default NumberOfMoviesWatched;
