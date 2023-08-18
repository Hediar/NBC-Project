import { getMovieDetail } from '@/api/tmdb';
import Image from 'next/image';
import React from 'react';

type Props = {
  movieId: string;
};
const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const MovieInfo = async ({ movieId }: Props) => {
  const movieData = await getMovieDetail(movieId);

  // console.log('무비이미지데이타=>>', movieData.backdropImages.length);

  return (
    <div>
      <div>
        <Image
          src={`${baseImgUrl}w533_and_h300_bestv2${movieData.backdrop_path}`}
          alt=""
          width={533}
          height={300}
          quality={100}
        />
      </div>
      <div>
        <Image
          src={`${baseImgUrl}w300_and_h450_bestv2${movieData.poster_path}`}
          alt=""
          width={300}
          height={450}
          quality={100}
        />
      </div>
      <div>제목: {movieData.title}</div>
      <div>영화 슬로건: {movieData.tagline}</div>
      <div>영화 설명: {movieData.overview}</div>
      <div>장르: {movieData.genres.map((genre: MovieGenre) => `${genre.name} `)}</div>
      <div>평점: {movieData.vote_average}</div>
      <div>개봉일: {movieData.release_date}</div>
      {movieData.watchProviders ? (
        <div>
          {movieData.watchProviders?.rent && (
            <div className="provider-rent">
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
                    />
                  </div>
                );
              })}
            </div>
          )}
          {movieData.watchProviders?.buy && (
            <div className="provider-buy">
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
    </div>
  );
};

export default MovieInfo;
