'use client';
import React, { useState, useEffect } from 'react';
import { AiFillUpCircle } from 'react-icons/ai';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트를 추가하여 버튼 표시 여부를 업데이트
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 스크롤 이벤트 리스너를 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 효과
    });
  };

  return (
    <button
      className={`fixed bottom-10 right-10 p-2 rounded-full cursor-pointer ${isVisible ? 'block' : 'hidden'}`}
      onClick={scrollToTop}
    >
      <AiFillUpCircle className="text-2xl" size="35" />
    </button>
  );
};

export default ScrollToTopButton;
