import Image from 'next/image';
import React from 'react';
import { baseImgUrl } from '@/static/baseImgUrl';
import TrendMoviesCarousel from '../Carousel/TrendMoviesCarousel';
import Link from 'next/link';

type Props = {
  photoData: MovieData[];
};

const TrendMovieSlider = ({ photoData }: Props) => {
  return (
    <div className="flex justify-center w-full rounded-md my-3 ">
      <TrendMoviesCarousel
        slides={photoData.map((imageData, idx) => {
          return (
            <Link href={`/detail/${imageData.id}`} key={idx}>
              <Image
                src={`${baseImgUrl}w1280${imageData.backdrop_path}`}
                className="rounded-lg"
                alt="Image"
                width={1280}
                height={720}
                priority
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
