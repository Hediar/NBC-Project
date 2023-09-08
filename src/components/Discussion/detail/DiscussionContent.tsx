import { getMovieDetail } from '@/api/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  movieId: string;
}
const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
const DiscussionContent = async ({ movieId }: Props) => {
  const movieData = await getMovieDetail(movieId);

  return (
    <>
      <p className="mt-10 h3_suit">토론 상세</p>
      <div className="flex items-center w-full mt-5 px-5 lg:px-10 py-5 rounded-[20px] shadow1 border sm:w-2/3 ">
        <div className="h-full relative">
          <Link href={`/detail/${movieId}`}>
            <Image
              src={`${baseImgUrl}w300_and_h450_bestv2${movieData.backdrop_path}`}
              alt="포스터 이미지"
              width={100}
              height={150}
              quality={100}
              className="rounded-lg"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-3 ml-3">
          <Link href={`/detail/${movieId}`}>
            <strong className="body1_bold_suit sm:text-[24px] sm:leading-[30px]">{movieData.title}</strong>
          </Link>

          <div className="caption_suit sm:text-[16px] sm:leading-[22px] text-[#888888]">
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
      </div>
    </>
  );
};

export default DiscussionContent;
