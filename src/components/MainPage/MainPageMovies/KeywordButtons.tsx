'use client';
import { getGenres } from '@/api/tmdb';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const KeywordButtons = () => {
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const params = useParams();
  const router = useRouter();

  const GetGenres = async () => {
    const genres = await getGenres();
    const genreData = [{ id: 'all', name: '전체' }, ...genres.genres];
    return genreData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data: MovieGenre[] = await GetGenres();
      setGenres(data);
    };
    fetchData();
    router.prefetch('/');
  }, []);

  const handleGenreClick = (genreId: number | undefined) => {
    // console.log(genreId);
    if (genreId) {
      router.push(`/${genreId}`);
    } else {
      router.push('/');
    }
  };
  return (
    <div className="p-5 overflow-scroll flex ">
      {genres.map((genre: MovieGenre, idx: number) => {
        // router.prefetch(`/${genre.id}`);
        // return (
        // <button
        //   key={genre.name}
        //   className={`bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-2 px-4 rounded ${
        //     (params.genreId === undefined && genre.name === '전체') || Number(params.genreId) === genre.id
        //       ? 'bg-blue-700'
        //       : ''
        //   }`}
        //   onClick={() => handleGenreClick(genre.id)}
        // >
        //   # {genre.name}
        // </button>

        // );
        {
          if (genre.id) {
            return (
              <Link
                key={genre.name}
                href={`/${genre.id}`}
                className={`block mt-7 bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-2 px-4 rounded ${
                  (params.genreId === undefined && genre.name === '전체') || Number(params.genreId) === genre.id
                    ? 'bg-blue-700'
                    : ''
                }`}
              >
                {' '}
                # {genre.name}
              </Link>
            );
          }
        }
      })}
    </div>
  );
};

export default KeywordButtons;
