import { getMovieDetail } from '@/api/tmdb';
import Image from 'next/image';
import React from 'react';
import MovieDetailBottomBar from './MovieDetailBottomBar';
import MovieLikes from '../MovieLikes/MovieLikes';

interface Props {
  movieId: string;
}

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const MovieDetailInfo = async ({ movieId }: Props) => {
  const movieData = await getMovieDetail(movieId);

  return (
    <div>
      {/* <MovieLikes movieid={+movieId} /> */}
      <div style={{ height: '35vh', color: 'white' }}>
        <div className="absolute w-full h-[35vh] -z-50 left-0">
          <div
            className="w-full h-full "
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.8)),
                  url("${baseImgUrl}w1920_and_h1080_bestv2${movieData.backdrop_path}")`,
              backgroundSize: '100% 100%',
              filter: 'brightness(1.35)'
            }}
          ></div>

          <div id="detail-cont" className="absolute w-[80%] left-[10%] bottom-0 mb-5">
            <h1 className="font-bold text-2xl mb-2">{movieData.title}</h1>
            <div className="flex items-center">
              <span>{movieData.release_date.slice(0, 4)}</span>
              <span style={{ fontSize: '0.5px' }}>●</span>
              <span>
                {movieData.genres.map((genre: MovieGenre, idx: number) =>
                  idx == movieData.genres.length - 1 ? `${genre.name}` : `${genre.name}/`
                )}
              </span>
              <span style={{ fontSize: '0.5px' }}>●</span>
              <span>{movieData.production_countries[0]['iso_3166_1']}</span>
            </div>
            <div>평점: {movieData.vote_average}</div>
            <div>상영시간: {movieData.runtime}분</div>
          </div>
          {movieData.watchProviders ? (
            <div id="providers-cont" className="absolute bottom-5 right-[10%] flex gap-3 pb-2">
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
            <div>{movieData.title} 제공 사가 없습니다.</div>
          )}
        </div>
      </div>

      <MovieDetailBottomBar movieId={movieId} movieData={movieData} />
    </div>
  );
};

export default MovieDetailInfo;
