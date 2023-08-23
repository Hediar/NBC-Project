'use client';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import TrailerPlay from './TrailerPlay';

type Props = {
  data: string[];
};

const Slider = ({ data }: Props) => {
  const [slideIndex, setSlideIndex] = useState(3);
  const slideRef = useRef<HTMLDivElement>(null);
  const len = data.length;
  const infiniteSlides = [...data.slice(len - 3), ...data, ...data.slice(0, 3)];
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isShow, setIsShow] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');

  const showTrailer = (key: string) => {
    setIsShow(!isShow);
    setTrailerKey(key);
  };

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
      setSlideIndex((prevIndex) => prevIndex - 1);
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = '';
          setSlideIndex(len);
        }
      }, 500);
    } else {
      if (slideRef.current) slideRef.current.style.transition = 'all 500ms ease-in-out';
      setSlideIndex((prevIndex) => prevIndex - 1);
    }
  };
  const debouncedSlide = (func: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(func, 200);
    setTimer(newTimer);
  };

  return (
    <div>
      {isShow && <TrailerPlay trailerKey={trailerKey} closeBtn={setIsShow} />}
      <div>
        <p className="font-bold text-gray-500">영상 {data?.length}</p>
        <div className="slider-container overflow-hidden relative">
          <div
            ref={slideRef}
            className="flex"
            style={{ width: `${infiniteSlides.length * 500}px`, transform: `translateX(-${slideIndex * 500}px)` }}
          >
            {infiniteSlides.map((videoKey: string, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full h-64 bg-gray-300 flex items-center justify-center"
                  onClick={() => showTrailer(videoKey)}
                >
                  <Image
                    alt=""
                    width={500}
                    height={300}
                    src={`${process.env.NEXT_PUBLIC_TMDB_TRAILER_THUMBNAIL_URL}${videoKey}/hqdefault.jpg`}
                    onClick={() => showTrailer(videoKey)}
                  />
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      border: '1px solid black',
                      borderRadius: '50%',
                      position: 'absolute',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <button
                      style={{
                        width: '100%',
                        height: '100%',
                        clipPath: 'polygon(75% 50%, 30% 25%, 30% 75%)',
                        backgroundColor: 'black'
                      }}
                    ></button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2"
            onClick={() => {
              debouncedSlide(prevSlide);
            }}
          >
            이전
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2"
            onClick={() => {
              debouncedSlide(nextSlide);
            }}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
