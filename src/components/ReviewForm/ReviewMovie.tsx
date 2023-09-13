'use client';

import { getDetailData } from '@/api/tmdb';
import { useSearchModalStore } from '@/store/useReviewStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  movieId: string | number;
};

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const ReviewMovie = ({ movieId }: Props) => {
  const [movieData, setMovieData] = useState<MovieDetailData>();

  const { openSearchModal } = useSearchModalStore();

  useEffect(() => {
    const fetchData = async () => {
      setMovieData(await getDetailData(movieId as string));
    };
    fetchData();
  }, [movieId]);

  if (!movieData) return <div>로딩 중..</div>;

  return (
    <>
      <div className="h-full relative">
        <Image
          src={`${baseImgUrl}w300_and_h450_bestv2${movieData.backdrop_path}`}
          alt="포스터 이미지"
          width={100}
          height={150}
          quality={100}
          className="rounded-lg"
        />
        <button
          onClick={() => {
            openSearchModal();
          }}
          className="button-dark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
        >
          변경
        </button>
      </div>
      <div className="flex flex-col gap-3 ml-6">
        <strong className="h4_suit">{movieData.title}</strong>
        <div className=" body1_regular_suit text-[#888888]">
          <div className="flex">
            {movieData.release_date.slice(0, 4)}
            <div className="flex items-center justify-center p-1">
              <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="1" cy="1" r="1" fill="#888888" />
              </svg>
            </div>

            {movieData.genres.map((genre: MovieGenre, idx: number) =>
              idx === movieData.genres.length - 1 ? `${genre.name}` : `${genre.name}/`
            )}
          </div>
          <div>{movieData.production_countries?.length && movieData.production_countries[0]['iso_3166_1']}</div>
          <div>{movieData.runtime}분</div>
          <div>{movieData.adult ? '청소년관람불가' : '전체관람가'}</div>
        </div>
      </div>
    </>
  );
};

export default ReviewMovie;
