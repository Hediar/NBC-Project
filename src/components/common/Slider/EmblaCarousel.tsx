'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { NextButton, PrevButton } from './ArrowsDotsButtons';

type PropType = {
  options?: EmblaOptionsType;
  slides: ReactNode[];
  slideWidth: string;
  slideHeight: string;
};

export const EmblaCarousel = (props: PropType) => {
  const { options, slides, slideHeight, slideWidth } = props; // props로 가져온 옵션과 슬라이드 리스트
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [emblaRef, embla] = useEmblaCarousel(options); // 슬라이더 구현에 필요한 요소들을 useEmblaCarousel 에서 가져온다.
  const [selectedIndex, setSelectedindex] = useState(0); // 현재 보여지는 인덱스를 설정
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]); // 스크롤 스냅 Point 를 설정할 때 사용할 state

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  // 이 코드는 구현할 때 사용하지 않았다. 하지만 나중에 혹시 쓰일 수 있을 것 같아서 남겨뒀다.
  const scrollTo = useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

  const onInit = useCallback(() => {
    if (!embla) return;
    setScrollSnaps(embla.scrollSnapList());
  }, []);
  // 현재 선택된 슬라이더의 순서(인덱스)를 저장을 위한 함수
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedindex(embla.selectedScrollSnap());
    // selectedScrollSnap:  선택한 스냅 Point의 인덱스를 가져온다.
    setPrevBtnDisabled(!embla.canScrollPrev());
    setNextBtnDisabled(!embla.canScrollNext());
  }, [embla, setSelectedindex]);

  useEffect(() => {
    if (!embla) return;
    onInit();
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
  }, [embla, setScrollSnaps, onInit, onSelect]);

  return (
    <div className="w-full relative rounded-md ">
      <div className="overflow-hidden relative rounded-md" ref={emblaRef}>
        <div className={`flex flex-col flex-wrap ${slideHeight} flex-none`}>
          {slides.map((slide, index) => (
            <div className={`${slideWidth} h-full relative mx-1`} key={index}>
              {slide}
            </div>
          ))}
        </div>
        <div className="absolute right-2 bottom-2 bg-[#0e0e0e72] rounded-full">
          <div className="flex justify-evenly items-center text-xs w-9 font-semibold">
            <span className="text-white">{selectedIndex + 1}</span>
            <div className="w-[2.05px] h-[2.05px] rounded-full bg-[#ffffffb2]" />
            <span className="text-[#ffffffb2]">{slides.length}</span>
          </div>
        </div>
        <div className="flex justify-between items-center absolute left-0 top-1/2 -translate-y-1/2 bg-transparent cursor-pointer z-10">
          <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
        </div>
        <div className="flex justify-between items-center absolute right-0 top-1/2 -translate-y-1/2 bg-transparent cursor-pointer z-10">
          <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
