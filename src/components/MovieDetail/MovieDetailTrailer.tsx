import { MovieBackdropImage, MovieData } from '@/types/types';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

type Props = {
  movieData: MovieData;
};

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const MovieDetailTrailer = ({ movieData }: Props) => {
  const { trailerKeys, backdropImages } = movieData;
  const [slideIndex, setSlideIndex] = useState(3);
  const slideRef = useRef<HTMLDivElement>(null);
  const len = trailerKeys.length;
  const infiniteSlides = [...trailerKeys.slice(len - 4, len - 1), ...trailerKeys, ...trailerKeys.slice(0, 3)];
  const nextSlide = () => {
    if (slideIndex === len + 2) {
      setSlideIndex((prevIndex) => prevIndex + 1);
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = '';
          setSlideIndex(3);
        }
      }, 500);
    } else {
      if (slideRef.current) slideRef.current.style.transition = 'all 500ms ease-in-out';
      setSlideIndex((prevIndex) => prevIndex + 1);
    }
  };
  const prevSlide = () => {
    if (slideIndex === 1) {
      // 처음 슬라이드 이전
      setSlideIndex(len + 1);
      if (slideRef.current) {
        slideRef.current.style.transition = '';
      }
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = 'all 500ms ease-in-out';
        }
      }, 0);
    } else {
      setSlideIndex((prevIndex) => prevIndex - 1); // 이전 슬라이드로 이동
    }
  };
  return (
    <div>
      <div>
        <p className="font-bold text-gray-500">영상 {trailerKeys?.length}</p>
        <div className="slider-container overflow-hidden relative">
          <div ref={slideRef} className="flex" style={{ transform: `translateX(-${slideIndex * 500}px)` }}>
            {infiniteSlides.map((key: string, idx: number) => {
              return (
                <div key={idx} className="w-full h-64 bg-gray-300 flex items-center justify-center">
                  <iframe
                    src={`
                    https://www.youtube.com/embed/${key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=ko&modestbranding=1&fs=1&autohide=1`}
                    width={500}
                    height={300}
                  />
                </div>
              );
            })}
          </div>
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2" onClick={prevSlide}>
            이전
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2" onClick={nextSlide}>
            다음
          </button>
        </div>
      </div>
      <div>
        <p className="font-bold text-gray-500 mt-10">포토 {backdropImages?.length}</p>
        <div className="flex flex-wrap gap-5">
          {backdropImages.map((image: MovieBackdropImage, idx: number) => {
            return (
              <Image
                key={idx}
                src={`${baseImgUrl}w533_and_h300_bestv2${image.file_path}`}
                alt=""
                width={266}
                height={150}
                quality={100}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailTrailer;
