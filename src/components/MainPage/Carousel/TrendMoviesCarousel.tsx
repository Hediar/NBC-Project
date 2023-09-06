'use client';
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react';
import { NextButton, PrevButton } from '@/components/common/Slider/ArrowsDotsButtons';

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
};

const TrendMoviesCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full relative sm:h-[400px] md:h-[460px] lg:h-[665px] mb-5">
      <div className="overflow-hidden relative sm:h-[400px] md:h-[460px] lg:h-[665px]" ref={emblaRef}>
        <div className="flex flex-col flex-wrap h-44 flex-none ml-8 md:ml-28">
          {slides.map((slide, index) => (
            <div className={'relative mx-1 sm:w-[100%] md:w-[60%] lg:w-[60%] xl:w-[60%]'} key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between absolute left-[30px] top-[50%] -translate-y-1/2 bg-transparent cursor-pointer z-10">
        <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
      </div>
      <div className="flex justify-between absolute right-[30px] top-[50%] -translate-y-1/2 bg-transparent cursor-pointer z-10">
        <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default TrendMoviesCarousel;
