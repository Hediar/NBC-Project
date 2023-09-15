'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

import Link from 'next/link';
import { useReviewMovieStore, useSearchModalStore } from '@/store/useReviewStore';
import Image from 'next/image';

type Props = {
  dataList: any;
  className?: string;
};

const MyMoviesSwiper = ({ dataList, className }: Props) => {
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
    <div className={className}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, A11y]} // 사용할 모듈
        // spaceBetween={spaceBetween} // 슬라이드 간격
        // slidesPerView={slidesPerView} // 화면에 보여줄 슬라이드 갯수
        // slidesPerGroup={slidesPerView} // 그룹으로 묶을 수. 동시에 슬라이드하게 하는 슬라이드의 숫자를 지정
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 8
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 8
          },
          // when window width is >= 860px
          860: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 8
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 20
          },
          // when window width is >= 1260px
          1260: {
            slidesPerView: 6,
            slidesPerGroup: 6,
            spaceBetween: 20
          }
        }}
        loop={false} // 슬라이드 무한 반복 여부
        autoplay={false} // 슬라이드 자동 재생 여부
        navigation // prev, next button 적용
        // scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
        observer={true}
        observeParents={true}
      >
        {dataList?.map((movie: any, i: number) => {
          return (
            <SwiperSlide key={i}>
              <div key={movie.title + i}>
                <button type="button" onClick={() => handleClick(movie.id)} className="cursor-pointer">
                  <Image
                    src={`${baseImgUrl}w342${movie.poster_path}`}
                    alt="포스터 이미지"
                    width={160}
                    height={240}
                    quality={80}
                    className="rounded-lg w-40 h-60"
                  />
                  <span className="block mt-1 text-left text-neutral-800 text-base font-bold leading-snug">
                    {movie.title}
                  </span>
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
