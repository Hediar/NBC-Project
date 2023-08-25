'use client';
import { getGenres } from '@/api/tmdb';

export const GetGenres = async () => {
  const genres = await getGenres();
  console.log(genres);
  const genreData = [{ name: '전체' }, ...genres.genres];
  // console.log(genreData);
  return genreData;
};

import { MovieGenre } from '@/types/types';
import React, { useState, useEffect } from 'react';
import TrendMoives from './TrendMoives';

const MainPageMovies = () => {
  const [genreData, setGenreDate] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await GetGenres();
      setGenreDate(data);
    };

    fetchData();
  }, []);

  const handleGenreClick = (genreId: number | null) => {
    setSelectedGenreId(genreId);
  };

  /**
   * 버튼 클릭 시, 필터링하여 데이터 전송
   */
  return (
    <div>
      {genreData.map((genre: MovieGenre, idx: number) => {
        return (
          <>
            <button
              key={genre.id}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-2 px-4 rounded ${
                selectedGenreId === genre.id ? 'bg-blue-700' : ''
              }`}
              onClick={() => handleGenreClick(genre.id)}
            >
              # {genre.name}
            </button>
          </>
        );
      })}
      <TrendMoives selectedGenreId={selectedGenreId} />
    </div>
  );
};

export default MainPageMovies;
