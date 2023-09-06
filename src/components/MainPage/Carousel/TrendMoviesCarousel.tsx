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
    <div className="w-full relative">
      <div className="overflow-hidden relative h-[460px] " ref={emblaRef}>
        <div className="flex flex-col flex-wrap h-44 flex-none ml-28">
          {slides.map((slide, index) => (
            <div className={'w-[60%] relative mx-1'} key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between absolute left-[190px] top-1/2 -translate-y-1/2 bg-transparent cursor-pointer z-10">
        <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
      </div>
      <div className="flex justify-between absolute right-[190px] top-1/2 -translate-y-1/2 bg-transparent cursor-pointer z-10">
        <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default TrendMoviesCarousel;
