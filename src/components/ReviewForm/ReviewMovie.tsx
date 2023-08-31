'use client';

import { getMovieDetail } from '@/api/tmdb';
import { useSearchModalStore } from '@/store/useReviewStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  movieId: string;
};

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const ReviewMovie = ({ movieId }: Props) => {
  const [movieData, setMovieData] = useState<MovieDataGenres>();

  const { openSearchModal } = useSearchModalStore();

  useEffect(() => {
    const fetchData = async () => {
      setMovieData(await getMovieDetail(movieId));
    };
    fetchData();
  }, [movieId]);

  if (!movieData) return <div>로딩 중..</div>;

  return (
    <div className="lg:flex lg:items-center h-full">
      <div className="h-full relative">
        <Image
          src={`${baseImgUrl}w300_and_h450_bestv2${movieData.backdrop_path}`}
          alt=""
          width={300}
          height={450}
          quality={100}
          className="object-cover w-auto h-full rounded-lg"
        />
        <button
          onClick={() => {
            openSearchModal();
          }}
          className="border border-indigo-500 bg-indigo-500 text-white rounded-md w-16 px-2 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          변경
        </button>
      </div>
      <div className="flex flex-col justify-between lg:ml-3 text-left">
        <strong>{movieData.title}</strong>
        <div>{movieData.release_date.slice(0, 4)}</div>
        <div>{movieData.genres.map((genre: MovieGenre) => `${genre.name} `)}</div>
        <div>{movieData.production_countries[0]['iso_3166_1']}</div>
        <div>{movieData.runtime}분</div>
        <div>{movieData.adult ? '청소년관람불가' : '전체관람가'}</div>
      </div>
    </div>
  );
};

export default ReviewMovie;
