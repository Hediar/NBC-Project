'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import EmblaCarousel from '@/components/common/Slider/EmblaCarousel';
import TrailerPlay from './TrailerPlay';
import { SVGPlayButton } from '@/styles/icons/IconsETC';

type Props = {
  trailerKeys: string[];
};

const TrailerSlider = ({ trailerKeys }: Props) => {
  const [isTrailerShow, setIsTrailerShow] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const showTrailer = (key: string) => {
    setIsTrailerShow(!isTrailerShow);
    setTrailerKey(key);
  };

  return (
    <div className="flex justify-center items-center w-full h-44 rounded-md font-thin text-xl my-3">
      {isTrailerShow && <TrailerPlay trailerKey={trailerKey} closeBtn={setIsTrailerShow} />}
      <EmblaCarousel
        slides={trailerKeys.map((KEY, idx) => {
          return (
            <React.Fragment key={idx}>
              <Image
                layout="fill"
                src={`${process.env.NEXT_PUBLIC_TMDB_TRAILER_THUMBNAIL_URL}${KEY}/hqdefault.jpg`}
                className="relative object-cover rounded-md cursor-pointer"
                alt="Image"
                onClick={() => showTrailer(KEY)}
              ></Image>
              <div className="flex justify-between items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent cursor-pointer z-10 pointer-events-none opacity-60">
                <SVGPlayButton />
              </div>
            </React.Fragment>
          );
        })}
        options={{
          align: 'start',
          loop: true,
          skipSnaps: false,
          inViewThreshold: 0.7
        }}
        slideHeight="h-[220px] sm:h-[10.5rem] lg:h-[12.5rem]"
        slideWidth="w-full sm:w-1/2 lg:w-1/4"
        isSlideLength={true}
        buttonPosition="center"
      />
    </div>
  );
};

export default TrailerSlider;
