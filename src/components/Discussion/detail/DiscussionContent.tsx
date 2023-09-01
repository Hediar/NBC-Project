'use client';
import { getMovieDetail } from '@/api/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Props {
  movieId: string;
}
const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
const DiscussionContent = ({ movieId }: Props) => {
  const [movieData, setMovieData] = useState<MovieData>();

  useEffect(() => {
    const fetchData = async () => {
      setMovieData(await getMovieDetail(movieId));
    };
    fetchData();
  }, [movieId]);

  if (!movieData) return <div>로딩 중..</div>;

  return (
    <div className="flex items-center w-full h-44 p-5 bg-slate-100 rounded-md">
      <div className="h-full relative">
        <Image
          src={`${baseImgUrl}w300_and_h450_bestv2${movieData.backdrop_path}`}
          alt="포스터 이미지"
          width={90}
          height={136}
          quality={100}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between ml-3 text-left">
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

export default DiscussionContent;
