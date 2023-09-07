import { getMovieDetail } from '@/api/tmdb';
import Image from 'next/image';
import React from 'react';
import MovieDetailBottomBar from './MovieDetailBottomBar';
import { MOVIE_COUNTRIES } from '@/static/movieCountries';
import WatchLaterButton from '../common/WatchLaterButton';
import MovieLikes from '../MovieLikes/MovieLikes';
import AddIgnoreMovieButton from '../common/AddIgnoreMovieButton';

interface Props {
  movieId: string;
}

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const MovieDetailInfo = async ({ movieId }: Props) => {
  const movieData = await getMovieDetail(movieId);

  const renderProviders = (data: MovieProvider[]) => {
    return (
      <div className="flex gap-2">
        {data.map((provider: MovieProvider, idx: number) => {
          return (
            <div key={idx}>
              <Image
                src={`${baseImgUrl}w100_and_h100_bestv2${provider.logo_path}`}
                alt=""
                width={60}
                height={60}
                quality={100}
                className="rounded-full"
              />
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <div style={{ height: '500px', color: 'white' }}>
        <div className="bg-gray-800 bg-opacity-30 rounded-xl py-1 px-1 absolute top-20 right-[11%] flex flex-col gap-[6px] items-center">
          <WatchLaterButton movieId={movieData.id} />
          <MovieLikes movieid={movieData.id} />
          <AddIgnoreMovieButton movieid={movieData.id} />
        </div>
        <div className="absolute w-full h-[500px] -z-50 left-0">
          <div
            className="min-w-[888px] h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.8)),
              url("${baseImgUrl}w1920_and_h1080_bestv2${movieData.backdrop_path}")`,
              backgroundSize: '100%',
              backgroundPositionY: '10%',
              filter: 'brightness(1.35)'
            }}
          ></div>

          <div id="detail-cont" className="absolute w-[80%] left-[10%] bottom-0 mb-20">
            <h1 className="font-bold text-[2rem] mb-2">{movieData.title}</h1>
            <div className="text-xl">
              <div className="flex items-center">
                <span>{movieData.release_date.slice(0, 4)}</span>
                <span style={{ fontSize: '0.5px' }}>●</span>
                <span>
                  {movieData.genres.map((genre: MovieGenre, idx: number) =>
                    idx == movieData.genres.length - 1 ? `${genre.name}` : `${genre.name}/`
                  )}
                </span>
                <span style={{ fontSize: '0.5px' }}>●</span>
                {movieData.production_countries.length && (
                  <span>
                    {
                      MOVIE_COUNTRIES.filter(
                        (country) => country.iso_3166_1 === movieData.production_countries[0]['iso_3166_1']
                      )[0].native_name
                    }
                  </span>
                )}
              </div>
              <div>상영시간: {movieData.runtime}분</div>
            </div>
          </div>
          {movieData.watchProviders ? (
            <div id="providers-cont" className="absolute bottom-10 right-[10%] flex gap-3 pb-2">
              {movieData.watchProviders?.rent && (
                <div id="provider-rent" className="flex flex-col gap-1">
                  <h5>Rent</h5>
                  {renderProviders(movieData.watchProviders.rent)}
                </div>
              )}
              {movieData.watchProviders?.buy && (
                <div id="provider-buy" className="flex flex-col gap-1">
                  <h5>Buy</h5>
                  {renderProviders(movieData.watchProviders.buy)}
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
