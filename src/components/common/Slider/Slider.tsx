'use client';
import Image from 'next/image';
import React from 'react';
import EmblaCarousel from './EmblaCarousel';
import { baseImgUrl } from '@/static/baseImgUrl';
import { useRouter } from 'next/navigation';
type Props = {
  photoData: MovieBackdropImage[];
};

const Slider = ({ photoData }: Props) => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center w-full rounded-md font-thin text-xl my-3">
      <EmblaCarousel
        slides={photoData.map((imageData, idx) => {
          return (
            <Image
              key={idx}
              layout="fill"
              src={`${baseImgUrl}w533_and_h300_bestv2${imageData.file_path}`}
              className=" object-cover rounded-md"
              alt="Image"
              style={{ aspectRatio: `${imageData.aspect_ratio}` }}
            ></Image>
          );
        })}
        options={{
          align: 'start',
          loop: true,
          skipSnaps: false,
          inViewThreshold: 0.7,
          dragFree: true
        }}
        slideHeight="h-[12.5rem]"
        slideWidth="w-1/4"
      />
    </div>
  );
};

export default Slider;
