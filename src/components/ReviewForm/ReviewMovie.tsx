'use client';

import { getMovieDetail } from '@/api/tmdb';
import Image from 'next/image';
import React from 'react';

type Props = {
  movieId: string;
};

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const ReviewMovie = ({ movieId }: Props) => {
  const [movieData, setMovieData] = React.useState<any>();

  React.useEffect(() => {
    const fetchData = async () => {
      setMovieData(await getMovieDetail(movieId));
    };
    fetchData();
  }, [movieId]);

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
      <button>영화 변경하기</button>
    </div>
  );
};

export default ReviewMovie;
