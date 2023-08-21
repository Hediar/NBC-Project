'use client';

import { getMovieDetail } from '@/api/tmdb';
import { MovieGenre } from '@/types/types';
import Image from 'next/image';
import React from 'react';

type Props = {
  movieId: string;
};

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const MovieInfo = async ({ movieId }: Props) => {
  // 엘리멘탈: 976573
  const [movieData, setMovieData] = React.useState<any>();
  React.useEffect(() => {
    const fetchDate = async () => {
      setMovieData(await getMovieDetail(movieId));
    };
    fetchDate();
  }, []);

  //   const movieData = await getMovieDetail(movieId);

  if (!movieData) return <div>로딩 중..</div>;

  return (
    <div>
      <Image
        src={`${baseImgUrl}w300_and_h450_bestv2${movieData.backdrop_path}`}
        alt=""
        width={300}
        height={450}
        quality={100}
        className="rounded-lg"
      />
      <strong>{movieData.title}</strong>
      <div>{movieData.release_date.slice(0, 4)}</div>
      <div>{movieData.genres.map((genre: MovieGenre) => `${genre.name} `)}</div>
      <div>{movieData.production_countries[0]['iso_3166_1']}</div>
      <div>{movieData.runtime}분</div>
      <div>{movieData.adult ? '청소년관람불가' : '전체관람가'}</div>
    </div>
  );
};

export default MovieInfo;
