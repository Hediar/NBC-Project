'use client';
import Image from 'next/image';
import React from 'react';
import EmblaCarousel from '../common/Slider/EmblaCarousel';
import { baseImgUrl } from '@/static/baseImgUrl';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';

type Props = {
  dataList: any;
  className?: string;
};

const MyMoviesSlider = ({ dataList, className }: Props) => {
  const { saveSearchMovieId } = useReviewMovieStore();
  const { closeSearchModal } = useSearchModalStore();

  const handleClick = (movieId: number) => {
    saveSearchMovieId(movieId);
    closeSearchModal();
  };

  const slides = dataList?.map((movie: any, i: number) => {
    return (
      <div key={movie.title + i} className={`${className} px-[10px] flex flex-col items-center`}>
        <button type="button" onClick={() => handleClick(movie.id)} className="cursor-pointer ">
          <Image
            src={`${baseImgUrl}w342${movie.poster_path}`}
            alt="포스터 이미지"
            width={160}
            height={240}
            quality={80}
            className="rounded-lg w-40 h-60"
          />
          <span className="block mt-1 text-left text-neutral-800 text-base font-bold leading-snug max-w-[160px]">
            {movie.title}
          </span>
        </button>
      </div>
    );
  });

  return (
    <div className="flex justify-center items-center w-full rounded-md font-thin text-xl my-3">
      <EmblaCarousel
        slides={slides}
        options={{
          align: 'start',
          loop: true,
          skipSnaps: false,
          inViewThreshold: 0.7,
          dragFree: true
        }}
        slideHeight="h-[288px]"
        slideWidth="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
        isSlideLength={true}
        buttonPosition="center"
      />
    </div>
  );
};

export default MyMoviesSlider;
