import Image from 'next/image';
import React from 'react';

import { baseImgUrl } from '@/static/baseImgUrl';
import EmblaCarousel from '@/components/common/Slider/EmblaCarousel';

type Props = {
  photoData: MovieData[];
};

const LatestMovieSlider = ({ photoData }: Props) => {
  return (
    <div className="flex justify-center items-center w-full h-44 rounded-md font-thin text-xl my-3">
      <EmblaCarousel
        slides={photoData.map((imageData, idx) => {
          return (
            <Image
              key={idx}
              layout="fill"
              src={`${baseImgUrl}w533_and_h300_bestv2${imageData.poster_path}`}
              className="object-cover rounded-md"
              alt="Image"
            ></Image>
          );
        })}
        options={{
          align: 'start',
          loop: true,
          skipSnaps: false,
          inViewThreshold: 0.7
        }}
        slideHeight="h-44"
        slideWidth="w-full"
      />
    </div>
  );
};

export default LatestMovieSlider;
