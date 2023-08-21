import { getMovieDetail } from '@/api/tmdb';
import Image from 'next/image';
import React from 'react';
import MovieDetailBottomBar from './MovieDetailBottomBar';
import { MovieGenre, MovieProvider } from '@/types/types';

type Props = {
  movieId: string;
};

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const MovieDetailInfo = async ({ movieId }: Props) => {
  const movieData = await getMovieDetail(movieId);

  return (
    <div>
      <div className="absolute w-screen h-2/3 opacity-50 -z-50 left-0">
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
        <div id="providers-cont" className="absolute bottom-1/3 right-12 flex  gap-3 pb-2">
          {movieData.watchProviders?.rent && (
            <div id="provider-rent" className="flex flex-col gap-1">
              <h5>Rent</h5>
              <div className="flex gap-2">
                {movieData.watchProviders.rent.map((provider: MovieProvider, idx: number) => {
                  return (
                    <div key={idx}>
                      <Image
                        src={`${baseImgUrl}w100_and_h100_bestv2${provider.logo_path}`}
                        alt=""
                        width={60}
                        height={60}
                        quality={100}
                        className="rounded-xl"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {movieData.watchProviders?.buy && (
            <div id="provider-buy" className="flex flex-col gap-1">
              <h5>Buy</h5>
              <div className="flex gap-2">
                {movieData.watchProviders.buy?.map((provider: MovieProvider, idx: number) => {
                  return (
                    <div key={idx}>
                      <Image
                        src={`${baseImgUrl}w100_and_h100_bestv2${provider.logo_path}`}
                        alt=""
                        width={60}
                        height={60}
                        quality={100}
                        className="rounded-xl"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>{movieData.title}를 제공하는 곳이 없습니다.</div>
      )}
      <MovieDetailBottomBar movieId={movieId} movieData={movieData} />
    </div>
  );
};

export default MovieDetailInfo;
