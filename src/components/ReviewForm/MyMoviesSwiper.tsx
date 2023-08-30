'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import Link from 'next/link';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';
import Image from 'next/image';

type Props = {
  dataList: any;
  spaceBetween: any;
  slidesPerView: any;
};

const MyMoviesSwiper = ({ dataList, spaceBetween, slidesPerView }: Props) => {
  const { saveSearchMovieId } = useReviewMovieStore();
  const { closeSearchModal } = useSearchModalStore();

  const handleClick = (movieId: number) => {
    saveSearchMovieId(movieId);
    closeSearchModal();
  };

  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

  SwiperCore.use([Navigation]);
  const swiperRef = React.useRef<SwiperCore>();

  return (
    <div>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Scrollbar]} // 사용할 모듈
        spaceBetween={spaceBetween} // 슬라이드 간격
        slidesPerView={slidesPerView} // 화면에 보여줄 슬라이드 갯수
        loop={true} // 슬라이드 무한 반복 여부
        autoplay={false} // 슬라이드 자동 재생 여부
        navigation // prev, next button 적용
        scrollbar={{ draggable: true }}
      >
        {dataList?.map((movie: any, i: number) => {
          return (
            <SwiperSlide key={i}>
              <div key={movie.title + i}>
                <button type="button" onClick={() => handleClick(movie.id)} className="cursor-pointer">
                  <Image
                    src={`${baseImgUrl}w342${movie.poster_path}`}
                    alt=""
                    width={342}
                    height={450}
                    quality={100}
                    className="rounded-lg"
                  />
                  <span>{movie.title}</span>
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MyMoviesSwiper;
