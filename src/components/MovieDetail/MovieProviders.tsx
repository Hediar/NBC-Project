import { baseImgUrl } from '@/static/baseImgUrl';
import Image from 'next/image';
import React from 'react';

interface Props {
  data: MovieProvider[];
}

const MovieProviders = ({ data }: Props) => {
  return (
    <div className="flex gap-2">
      {data.map((provider: MovieProvider, idx: number) => {
        return (
          <div key={idx}>
            <Image
              src={`${baseImgUrl}w100_and_h100_bestv2${provider.logo_path}`}
              alt=""
              width={60}
              height={60}
              quality={100}
              className="rounded-full"
            />
          </div>
        );
      })}
    </div>
  );
};

export default MovieProviders;