'use client';
import { fetchTrendMoviesByGenre, getGenres } from '@/api/tmdb';
import { MovieGenre } from '@/types/types';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const KeywordButtons = () => {
  const [genres, setGenres] = useState([]);
  const params = useParams();
  const router = useRouter();

  const GetGenres = async () => {
    const genres = await getGenres();
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
    genreId === undefined ? router.push('/') : router.push(`/${genreId}`);
  };

  return (
    <div>
      {genres.map((genre: MovieGenre, idx: number) => {
        return (
          <>
            <button
              key={genre.id}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-2 px-4 rounded ${
                (params.genreId === undefined && genre.name === '전체') || Number(params.genreId) === genre.id
                  ? 'bg-blue-700'
                  : ''
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
