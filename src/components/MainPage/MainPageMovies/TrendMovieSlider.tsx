import Image from 'next/image';
import React from 'react';

import { baseImgUrl } from '@/static/baseImgUrl';
import EmblaCarousel from '@/components/common/Slider/EmblaCarousel';
import Carousel from './Carousel';

type Props = {
  photoData: MovieData[];
};

const TrendMovieSlider = ({ photoData }: Props) => {
  return (
    <div className="flex justify-center items-center w-full h-60 rounded-md font-thin text-xl my-3">
      <Carousel
        slides={photoData.map((imageData, idx) => {
          return (
            <Image
              key={idx}
              layout="fill"
              src={`${baseImgUrl}w533_and_h300_bestv2${imageData.backdrop_path}`}
              className="w-51.125 h-28.75rem"
              alt="Image"
            ></Image>
          );
        })}
        options={{
          loop: true
        }}
      />
    </div>
  );
};

export default TrendMovieSlider;
