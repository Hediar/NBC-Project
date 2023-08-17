import { getMovieDetail } from '@/api/tmdb';
import React from 'react';
type Props = {
  movieId: number;
};

const MovieInfo = async ({ movieId }: Props) => {
  const movieData = await getMovieDetail(movieId);

  //   console.log('무비데이타=>>', movieData.watchProviders.buy);

  return (
    <div>
      <div>
        <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}w300_and_h450_bestv2${movieData.poster_path}`} alt="" />
      </div>
      <div>제목: {movieData.title}</div>
      <div>영화 설명: {movieData.overview}</div>
      <div>장르: {movieData.genres.map((genre: any) => `${genre.name} `)}</div>
      <div>평점: {movieData.vote_average}</div>
      <div>개봉일: {movieData.release_date}</div>

      {movieData.watchProviders.rent && (
        <div className="provider-rent">
          <h5>Rent</h5>
          {movieData.watchProviders.rent.map((provider: any, idx: number) => {
            return (
              <div key={idx}>
                <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}w100_and_h100_bestv2${provider.logo_path}`} />
              </div>
            );
          })}
        </div>
      )}
      {movieData.watchProviders.buy && (
        <div className="provider-buy">
          <h5>Buy</h5>
          {movieData.watchProviders.buy?.map((provider: any, idx: number) => {
            return (
              <div key={idx}>
                <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}w100_and_h100_bestv2${provider.logo_path}`} />
              </div>
            );
          })}
        </div>
      )}
      {movieData.trailerKeys.map((key: string, idx: number) => {
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
  );
};

export default MovieInfo;
