import Image from 'next/image';
import React from 'react';
import { baseImgUrl } from '@/static/baseImgUrl';
import Link from 'next/link';
import EmblaCarousel from '@/components/common/Slider/EmblaCarousel';

type Props = {
  photoData: MovieData[];
};

const TrendMovieSlider = ({ photoData }: Props) => {
  return (
    <div className="flex justify-center w-full rounded-md my-3">
      <EmblaCarousel
        slides={photoData.map((imageData, idx) => {
          return (
            <Link href={`/detail/${imageData.id}`} key={idx}>
              <Image
                src={`${baseImgUrl}w1280${imageData.backdrop_path}`}
                className="rounded-2xl px-1"
                alt="Image"
                width={760}
                height={460}
                priority
              ></Image>
            </Link>
          );
        })}
        options={{
          loop: true
        }}
        slideWidth={'w-full sm:w-2/5'}
        slideHeight={'h-[195px] sm:h-[230px] xl:h-[460px]'}
        isSlideLength={false}
        buttonPosition={'center'}
      />
    </div>
  );
};

export default TrendMovieSlider;
