import { getMovieDetail } from '@/api/tmdb';
import Image from 'next/image';
import React from 'react';
import MovieDetailBottomBar from './MovieDetailBottomBar';
import { getRealTicketList } from '@/api/kobis';

type Props = {
  movieId: string;
};
const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const MovieDetailInfo = async ({ movieId }: Props) => {
  const movieData = await getMovieDetail(movieId);
  const realTicketingRate = await getRealTicketList();
  // console.log('무비이미지데이타=>>', movieData);

  return (
    <div>
      <div className="absolute w-screen h-2/3 opacity-30 -z-50 left-0">
        <Image
          src={`${baseImgUrl}w1920_and_h1080_bestv2${movieData.backdrop_path}`}
          alt=""
          width={1920}
          height={1080}
          quality={100}
          className="w-full h-full"
        />
      </div>
      <div className="pt-5">
        <Image
          src={`${baseImgUrl}w300_and_h450_bestv2${movieData.poster_path}`}
          alt=""
          width={280}
          height={420}
          quality={100}
          className="rounded-lg"
        />
      </div>
      <div id="detail-cont" className="mt-5 mb-5">
        <h1 className="font-bold text-4xl">{movieData.title}</h1>
        <div>영화 슬로건: {movieData.tagline}</div>
        <div>영화 설명: {movieData.overview}</div>
        <div>장르: {movieData.genres.map((genre: MovieGenre) => `${genre.name} `)}</div>
        <div>평점: {movieData.vote_average}</div>
        <div>개봉일: {movieData.release_date.slice(0, 4)}</div>
        <div>상영시간: {movieData.runtime}분</div>
        <div>제작: {movieData.production_countries[0]['iso_3166_1']}</div>
      </div>

      {movieData.watchProviders ? (
        <div id="providers-cont" className="absolute bottom-1/3 right-12 flex flex-col gap-2">
          {movieData.watchProviders?.rent && (
            <div id="provider-rent" className="flex gap-2">
              <h5>Rent</h5>
              {movieData.watchProviders.rent.map((provider: MovieProvider, idx: number) => {
                return (
                  <div key={idx}>
                    <Image
                      src={`${baseImgUrl}w100_and_h100_bestv2${provider.logo_path}`}
                      alt=""
                      width={80}
                      height={80}
                      quality={100}
                      className=""
                    />
                  </div>
                );
              })}
            </div>
          )}
          {movieData.watchProviders?.buy && (
            <div id="provider-buy" className="flex gap-2 ml-1.5">
              <h5>Buy</h5>
              {movieData.watchProviders.buy?.map((provider: MovieProvider, idx: number) => {
                return (
                  <div key={idx}>
                    <Image
                      src={`${baseImgUrl}w100_and_h100_bestv2${provider.logo_path}`}
                      alt=""
                      width={80}
                      height={80}
                      quality={100}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div>{movieData.title}를 제공하는 곳이 없습니다.</div>
      )}
      <div>
        {movieData.trailerKeys?.map((key: string, idx: number) => {
          if (idx < 3) {
            return (
              <iframe
                key={idx}
                src={`
                    https://www.youtube.com/embed/${key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=ko&modestbranding=1&fs=1&autohide=1`}
                width={500}
                height={300}
              />
            );
          }
        })}
      </div>
      <div>
        {movieData.backdropImages.map((image: MovieBackdropImage, idx: number) => {
          if (idx < 3)
            return (
              <Image
                key={idx}
                src={`${baseImgUrl}w533_and_h300_bestv2${image.file_path}`}
                alt=""
                width={533}
                height={300}
                quality={100}
              />
            );
        })}
      </div>
      <MovieDetailBottomBar movieId={movieId} />
    </div>
  );
};

export default MovieDetailInfo;
