'use client';
import Image from 'next/image';
import React from 'react';
import EmblaCarousel from './EmblaCarousel';
import { baseImgUrl } from '@/static/baseImgUrl';

type Props = {
  photoData: MovieBackdropImage[];
};

const Slider = ({ photoData }: Props) => {
  return (
    <div className="flex justify-center items-center w-full rounded-md font-thin text-xl my-3">
      <EmblaCarousel
        slides={photoData.map((imageData, idx) =>
          imageData.file_path === 'DUMMY' ? (
            <div key={idx} className="bg-slate-100 h-full"></div>
          ) : (
            <Image
              key={idx}
              layout="fill"
              src={`${baseImgUrl}w533_and_h300_bestv2${imageData.file_path}`}
              className="object-cover rounded-3xl px-2"
              alt="Image"
              style={{ aspectRatio: `${imageData.aspect_ratio}` }}
            ></Image>
          )
        )}
        options={{
          align: 'start',
          loop: true,
          skipSnaps: false,
          inViewThreshold: 0.7,
          dragFree: true
        }}
        slideHeight="h-[220px] sm:h-[10.5rem] lg:h-[12.5rem]"
        slideWidth="w-full sm:w-1/2 lg:w-1/4"
        isSlideLength={true}
        buttonPosition="center"
      />
    </div>
  );
};

export default Slider;
