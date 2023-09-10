'use client';

import React from 'react';
import { usePalette } from 'color-thief-react';

type Props = {
  poster_path: string;
};

const PosterBaseColor = ({ poster_path }: Props) => {
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
  const posterUrl = `${baseImgUrl}w300_and_h450_bestv2${poster_path}`;

  const { data: colorData } = usePalette(
    `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=${encodeURIComponent(
      posterUrl
    )}`,
    7,
    'hslArray',
    {
      crossOrigin: 'anonymous'
    }
  );

  const filteredColor = colorData?.filter((color) => Number(color[2]) > 25);

  return (
    filteredColor && (
      <div className="absolute top-0 left-0 w-full h-full transition-colors bg-white">
        <div
          className="h-full opacity-70"
          style={{
            background: `linear-gradient(90deg, hsl(${filteredColor![0][0]}deg ${filteredColor![0][1]}% ${
              filteredColor![0][2]
            }%), hsl(${filteredColor![2][0]}deg ${filteredColor![2][1]}% ${filteredColor![2][2]}%)`
          }}
        ></div>
      </div>
    )
  );
};

export default PosterBaseColor;
