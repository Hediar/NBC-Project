import { getDetailData, getProviderData } from '@/api/tmdb';
import React from 'react';
import MovieDetailBottomBar from './MovieDetailBottomBar';
import { MOVIE_COUNTRIES } from '@/static/movieCountries';
import WatchLaterButton from '../common/Buttons/WatchLaterButton';
import MovieLikes from '../common/Buttons/MovieLikes';
import AddIgnoreMovieButton from '../common/AddIgnoreMovieButton';
import MovieProviders from './MovieProviders';
import Image from 'next/image';

interface Props {
  movieId: string;
}

const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

const MovieDetailInfo = async ({ movieId }: Props) => {
  const [movieData, watchProviders] = await Promise.all([getDetailData(movieId), getProviderData(movieId)]);

  if (movieData)
    return (
      <div>
        <div className="w-full h-[400px] sm:text-white relative">
          <div className="bg-gray-800 bg-opacity-30 rounded-xl py-1 px-1 absolute top-5 sm:top-10 right-[11%] flex flex-col gap-[6px] items-center">
            <WatchLaterButton movieId={movieData.id} />
            <MovieLikes movieid={movieData.id} />
            <AddIgnoreMovieButton movieid={movieData.id} />
          </div>
          <div className="absolute w-full h-[400px] -z-50 left-0 overflow-hidden ">
            <div className="relative">
              <Image
                src={`${baseImgUrl}w1920_and_h1080_bestv2${movieData.backdrop_path}`}
                alt="Image"
                width={1920}
                height={1080}
                className="w-full mt-[-5%]"
                priority={true}
              />
              <div className="w-full h-full left-0 top-0 absolute bg-gradient-to-b from-black to-black opacity-70" />
            </div>
            <div id="detail-cont" className="absolute w-[80%] left-[10%] -bottom-12 mb-20 sm:bottom-0">
              <h1 className="h3_suit mb-2">{movieData.title}</h1>
              <div className="text-xl font-bold leading-normal">
                <div className="flex flex-wrap items-center">
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
            {watchProviders && (
              <div
                id="providers-cont"
                className="absolute top-32 sm:top-auto sm:bottom-10 right-[10%] flex gap-3 pb-2 caption_suit text-white"
              >
                {watchProviders?.rent && (
                  <div id="provider-rent" className="flex flex-col gap-1">
                    <p>Rent</p>
                    <MovieProviders data={watchProviders.rent} />
                  </div>
                )}
                {watchProviders?.buy && (
                  <div id="provider-buy" className="flex flex-col gap-1">
                    <p>Buy</p>
                    <MovieProviders data={watchProviders.buy} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <MovieDetailBottomBar movieId={movieId} movieData={movieData} />
      </div>
    );
};

export default MovieDetailInfo;
