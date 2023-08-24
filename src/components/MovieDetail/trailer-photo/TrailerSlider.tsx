'use client';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import TrailerPlay from './TrailerPlay';

type Props = {
  slideData: string[];
  itemNum: number;
  gap: number;
};

const TrailerSlider = ({ slideData, itemNum, gap }: Props) => {
  const PADDING_X = gap / 2;
  const ITEM_NUM = itemNum > slideData.length ? slideData.length : itemNum;
  //스크롤바때문에 ..ㅠㅠ..
  const ITEM_WIDTH = ((window.innerWidth - 17) * 80) / (100 * ITEM_NUM);
  const ITEM_HEIGHT = ITEM_WIDTH * (300 / 533);
  const SCREEN_BAR_HEIGHT = (ITEM_WIDTH / 32) * 3;
  const [slideIndex, setSlideIndex] = useState(ITEM_NUM);
  const slideRef = useRef<HTMLDivElement>(null);
  const len = slideData.length;
  const infiniteSlides = [...slideData, ...slideData, ...slideData];
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isTrailerShow, setIsTrailerShow] = useState(false);
  const [isBtnShow, setIsBtnShow] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');

  const showTrailer = (key: string) => {
    setIsTrailerShow(!isTrailerShow);
    setTrailerKey(key);
  };

  const nextSlide = () => {
    if (slideIndex === len + ITEM_NUM - 1) {
      setSlideIndex((prevIndex) => prevIndex + 1);
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = '';
          setSlideIndex(ITEM_NUM);
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
      {isTrailerShow && <TrailerPlay trailerKey={trailerKey} closeBtn={setIsTrailerShow} />}
      <div>
        <p className="font-bold text-gray-500">트레일러 {slideData?.length}</p>
        <div className="slider-container overflow-hidden relative">
          <div
            className={`absolute left-0 top-0 bg-white w-full z-10`}
            style={{ height: `${SCREEN_BAR_HEIGHT}px` }}
          ></div>
          <div
            className={`absolute left-0 bottom-0 bg-white w-full z-10`}
            style={{ height: `${SCREEN_BAR_HEIGHT}px` }}
          ></div>
          <div
            ref={slideRef}
            onMouseEnter={() => {
              setIsBtnShow((prev) => !prev);
            }}
            onMouseLeave={() => {
              setIsBtnShow((prev) => !prev);
            }}
            className="flex"
            style={{
              width: `${infiniteSlides.length * ITEM_WIDTH}px`,
              transform: `translateX(-${slideIndex * ITEM_WIDTH}px)`
            }}
          >
            {infiniteSlides.map((videoKey: string, idx) => {
              return (
                <div
                  key={idx}
                  className={`w-[${ITEM_WIDTH}px] h-[${ITEM_HEIGHT}px] bg-white flex items-center justify-center m-auto`}
                >
                  <Image
                    className="hover:cursor-pointer"
                    alt=""
                    width={ITEM_WIDTH - PADDING_X}
                    height={ITEM_HEIGHT}
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
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      pointerEvents: 'none'
                    }}
                  >
                    <button
                      style={{
                        width: '100%',
                        height: '100%',
                        clipPath: 'polygon(75% 50%, 30% 25%, 30% 75%)',
                        backgroundColor: 'black',
                        pointerEvents: 'none'
                      }}
                    ></button>
                  </div>
                </div>
              );
            })}
          </div>
          {isBtnShow && (
            <>
              <button
                onMouseEnter={() => {
                  setIsBtnShow((prev) => !prev);
                }}
                onMouseLeave={() => {
                  setIsBtnShow((prev) => !prev);
                }}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 border-2 rounded-full w-10 h-10 flex justify-center items-center font-bold text-white"
                onClick={() => {
                  debouncedSlide(prevSlide);
                }}
              >
                {'<'}
              </button>
              <button
                onMouseEnter={() => {
                  setIsBtnShow((prev) => !prev);
                }}
                onMouseLeave={() => {
                  setIsBtnShow((prev) => !prev);
                }}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 border-2 rounded-full w-10 h-10 flex justify-center items-center font-bold text-white"
                onClick={() => {
                  debouncedSlide(nextSlide);
                }}
              >
                {'>'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerSlider;
