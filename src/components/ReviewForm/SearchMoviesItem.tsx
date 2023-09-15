'use client';

import { getDetailData } from '@/api/tmdb';
import { Skeleton } from 'antd';
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
      <button type="button" onClick={() => handleClick(movie.id)} className="flex items-center" title={movie.title}>
        <div className="overflow-hidden flex justify-center items-center flex-none max-w-[60px] max-h-[90px] h-full relative rounded-lg bg-[#f0f0f0] ant-bg-none">
          {movie.backdrop_path ? (
            <Image
              src={`${baseImgUrl}w300_and_h450_bestv2${movie.backdrop_path}`}
              alt="포스터 이미지"
              width={60}
              height={90}
              quality={70}
            />
          ) : (
            <Skeleton.Image active={!!movie.backdrop_path} className="scale-75" />
          )}
        </div>

        <div className="flex flex-col gap-3 ml-2 text-left ">
          <strong className="overflow-hidden max-h-[2.75rem] text-neutral-800 text-base font-normal leading-snug">
            {movie.title}
          </strong>
          <div className="text-zinc-500 text-xs font-normal leading-5">
            <div className="flex">
              {movie.release_date.slice(0, 4)}
              <div className="flex items-center justify-center p-1">
                <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="1" cy="1" r="1" fill="#888888" />
                </svg>
              </div>

              {detailData?.genres.map((genre: MovieGenre, idx: number) =>
                idx === detailData.genres.length - 1 ? `${genre.name}` : `${genre.name}/`
              )}
            </div>

            <div className="flex">
              {detailData?.production_countries?.length && detailData.production_countries[0]['iso_3166_1']}
              <div className="flex items-center justify-center p-1">
                <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="1" cy="1" r="1" fill="#888888" />
                </svg>
              </div>
              {detailData?.runtime}분
              <div className="flex items-center justify-center p-1">
                <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="1" cy="1" r="1" fill="#888888" />
                </svg>
              </div>
              {movie.adult ? '청소년관람불가' : '전체관람가'}
            </div>
          </div>
        </div>
      </button>
    </li>
  );
};

export default SearchMoviesItem;
