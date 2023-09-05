import Image from 'next/image';
import React from 'react';
import { baseImgUrl } from '@/static/baseImgUrl';
import TrendMoviesCarousel from './TrendMoviesCarousel';
import Link from 'next/link';

type Props = {
  photoData: MovieData[];
};

const TrendMovieSlider = ({ photoData }: Props) => {
  return (
    <div className="flex justify-center w-full h-60 rounded-md font-thin text-xl my-3">
      <TrendMoviesCarousel
        slides={photoData.map((imageData, idx) => {
          return (
            <Link href={`/detail/${imageData.id}`} key={idx}>
              <Image
                src={`${baseImgUrl}w1280_and_h720_bestv2${imageData.backdrop_path}`}
                className="w-51.125 h-28.75rem rounded-lg"
                alt="Image"
                width={760}
                height={460}
              ></Image>
            </Link>
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
