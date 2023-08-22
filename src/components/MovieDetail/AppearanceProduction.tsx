import { MovieData } from '@/types/types';
import Image from 'next/image';
import React from 'react';

type Props = {
  movieData: MovieData;
};

const AppearanceProduction = ({ movieData }: Props) => {
  const { appearences, productions } = movieData;

  return (
    <div className="flex w-full justify-between">
      <div className="flex w-1/2 flex-col gap-3">
        <p>출연</p>
        {appearences.map((cast, idx) => {
          return (
            <div key={idx} className="flex">
              <div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_BASE_PROFILE_IMG_URL}${cast.profile_path}`}
                  alt=""
                  width={116}
                  height={168}
                />
              </div>

              <div className="flex flex-col m-2">
                <span className="font-bold text-lg">{cast.name}</span>
                <p className="text-base text-gray-500">{cast.character}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-1/2 flex-col gap-3">
        <p>제작</p>
        {productions.map((crew, idx) => {
          return (
            <div key={idx} className="flex">
              <div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_BASE_PROFILE_IMG_URL}${crew.profile_path}`}
                  alt=""
                  width={116}
                  height={168}
                />
              </div>

              <div className="flex flex-col m-2">
                <span className="font-bold text-lg">{crew.name}</span>
                <p className="text-base text-gray-500">{crew.department}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppearanceProduction;
