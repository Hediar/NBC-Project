'use client';
import React, { ReactNode, useState, useEffect, useCallback } from 'react';
import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react';
import { NextButton, PrevButton } from '@/components/common/Slider/ArrowsDotsButtons';

type PropType = {
  options?: EmblaOptionsType;
  slides: ReactNode[];
  slideWidth: string;
  slideHeight: string;
  buttonPosition: string;
  isSlideLength: boolean;
};

const TrendMoviesCarousel: React.FC<PropType> = (props) => {
  const { options, slides, slideHeight, slideWidth, buttonPosition, isSlideLength } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const carouselButton = `w-8 h-8 flex justify-between items-center absolute top-1/2 -translate-y-1/2 bg-transparent cursor-pointer z-10`;

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect, onInit]);

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

export default TrendMoviesCarousel;
