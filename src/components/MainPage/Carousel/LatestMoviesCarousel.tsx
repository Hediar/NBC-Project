'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { NextButton, PrevButton } from '@/components/common/Slider/ArrowsDotsButtons';

type PropType = {
  options?: EmblaOptionsType;
  slides: ReactNode[];
  slideWidth: string;
  slideHeight: string;
  buttonPosition: string;
  isSlideLength: boolean;
};

export const LatestMoviesCarousel = (props: PropType) => {
  const { options, slides, slideHeight, slideWidth, buttonPosition, isSlideLength } = props; // props로 가져온 옵션과 슬라이드 리스트
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [emblaRef, embla] = useEmblaCarousel(options); // 슬라이더 구현에 필요한 요소들을 useEmblaCarousel 에서 가져온다.

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const carouselButton = `w-8 h-8 flex justify-between items-center absolute top-1/2 -translate-y-1/2 bg-transparent cursor-pointer z-10`;

  const onInit = useCallback(() => {
    if (!embla) return;
  }, [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;

    setPrevBtnDisabled(!embla.canScrollPrev());
    setNextBtnDisabled(!embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onInit();
    onSelect();

    embla.on('select', onSelect);
  }, [embla, onInit, onSelect]);

  return (
    <div className="w-full relative rounded-md">
      <div className="overflow-hidden relative rounded-md" ref={emblaRef}>
        <div className={`flex flex-col flex-wrap ${slideHeight} flex-none`}>
          {slides.map((slide, index) => (
            <div className={`${slideWidth} h-full relative mx-1`} key={index}>
              {slide}
            </div>
          ))}
        </div>
        {buttonPosition === 'center' && (
          <>
            <div className={`${carouselButton} left-10`}>
              <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
            </div>
            <div className={`${carouselButton} right-10`}>
              <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
            </div>
          </>
        )}

        {buttonPosition === 'rightTop' && (
          <div className="absolute top-[40px] right-[40px] z-10">
            <div className="flex items-center">
              <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} className="p-1 rounded-full cursor-pointer" />
              <NextButton onClick={scrollNext} disabled={nextBtnDisabled} className="p-1 rounded-full cursor-pointer" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestMoviesCarousel;
