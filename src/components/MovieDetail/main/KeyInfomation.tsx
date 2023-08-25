import { MovieData } from '@/types/types';
import Image from 'next/image';
import React from 'react';

type Props = {
  movieData: MovieData;
};
const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
const KeyInfomation = ({ movieData }: Props) => {
  const { poster_path, overview, tagline, vote_average, appearences, productions } = movieData;

  return (
    <div>
      <div className="flex">
        <div>
          <Image
            src={`${baseImgUrl}w300_and_h450_bestv2${poster_path}`}
            alt=""
            width={250}
            height={375}
            quality={100}
            className="rounded-lg"
          />
        </div>
        <div id="detail-cont" className="w-[80%] flex flex-col justify-between p-5">
          <div className="text-sm">
            <p className="font-bold text-base mb-1">{tagline}</p>
            <span>{overview}</span>
          </div>
          <div>
            <p className="font-bold text-base">평점: {vote_average.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyInfomation;
