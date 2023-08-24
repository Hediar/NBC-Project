'use client';
import { getGenres } from '@/api/tmdb';
import { MovieGenre } from '@/types/types';
import React, { useState, useEffect } from 'react';

const KeywordButtons = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  const GetGenres = async () => {
    const genres = await getGenres();
    console.log(genres);
    const genreData = [{ name: '전체' }, ...genres.genres];
    return genreData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await GetGenres();
      setGenres(data);
    };

    fetchData();
  }, []);

  const handleGenreClick = (genreId: number | null) => {
    setSelectedGenreId(genreId);
  };

  return (
    <div>
      {genres.map((genre: MovieGenre, idx: number) => {
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
    </div>
  );
};

export default KeywordButtons;
