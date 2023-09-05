'use client';

import { getDetailData } from '@/api/tmdb';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {
  movie: TMDBSearchMovie;
  handleClick: any;
};

const SearchMoviesItem = ({ movie, handleClick }: Props) => {
  const [detailData, setDetailData] = useState<any>();

  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDetailData(String(movie.id));
      setDetailData(result);
    };
    fetchData();
  }, [movie]);

  return (
    <li>
      <button type="button" onClick={() => handleClick(movie.id)} className="lg:flex lg:items-center">
        <Image
          src={`${baseImgUrl}w300_and_h450_bestv2${movie.backdrop_path}`}
          alt="포스터"
          width={300}
          height={450}
          quality={100}
          className="object-cover w-full h-auto rounded-lg lg:w-28"
        />
        <div className="flex flex-col justify-between lg:ml-3 text-left">
          <strong>{movie.title}</strong>
          <div>{movie.release_date.slice(0, 4)}</div>
          <div>{detailData && detailData.genres.map((genre: MovieGenre) => `${genre.name} `)}</div>
          <div>{detailData?.production_countries.length && detailData.production_countries[0]['iso_3166_1']}</div>
          <div>{detailData && detailData.runtime}분</div>
          <div>{movie.adult ? '청소년관람불가' : '전체관람가'}</div>
        </div>
      </button>
    </li>
  );
};

export default SearchMoviesItem;
