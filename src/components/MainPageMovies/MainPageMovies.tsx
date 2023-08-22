import { getGenres } from '@/api/tmdb';
import { MovieGenre } from '@/types/types';
import React from 'react';
import TrendMoives from '../TrendMoives';

const MainPageMovies = async () => {
  const genres = await getGenres();
  const genreData = [{ name: '전체' }, ...genres.genres];
  console.log(genreData);

  /**
   * 버튼 클릭 시, 필터링하여 데이터 전송
   */
  return (
    <div>
      {genreData.map((genre: MovieGenre, idx: number) => {
        return (
          <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              # {genre.name}
            </button>
          </>
        );
      })}
      <TrendMoives />
    </div>
  );
};

export default MainPageMovies;
