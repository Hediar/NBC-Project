import React, { useState } from 'react';

const TrailerSlider = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const slides = ['Slide 3', 'Slide 1', 'Slide 2', 'Slide 3', 'Slide 1'];

  const totalSlides = slides.length;

  const nextSlide = () => {
    if (slideIndex > 4) {
      setSlideIndex(1);
    } else {
      setSlideIndex((prev) => (prev + 1) % totalSlides);
    }
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="slider-container overflow-hidden relative">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${slideIndex * 500}px)` }}
      >
        {/* 각 슬라이드 아이템 */}
        {slides.map((slide, index) => (
          <div key={index} className="w-1/3 h-80 bg-gray-300 flex items-center justify-center">
            {slide}
          </div>
        ))}
      </div>
      <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2" onClick={prevSlide}>
        이전
      </button>
      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2" onClick={nextSlide}>
        다음
      </button>
    </div>
  );
};

export default TrailerSlider;
