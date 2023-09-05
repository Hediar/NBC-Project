import Image from 'next/image';
import React from 'react';
import EmblaCarousel from './EmblaCarousel';
import { baseImgUrl } from '@/static/baseImgUrl';
import Link from 'next/link';
type Props = {
  photoData: MovieBackdropImage[];
};

const Slider = ({ photoData }: Props) => {
  return (
    <div className="flex justify-center items-center w-full h-44 rounded-md font-thin text-xl my-3">
      <EmblaCarousel
        slides={photoData.map((imageData, idx) => {
          return (
            <Image
              key={idx}
              layout="fill"
              src={`${baseImgUrl}w533_and_h300_bestv2${imageData.file_path}`}
              className=" object-cover rounded-md"
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
        slideHeight="w-1/4"
        slideWidth="h-44"
      />
    </div>
  );
};

export default Slider;
