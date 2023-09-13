'use client';
/* eslint-disable @next/next/no-img-element */

import { StarFill } from '@/styles/icons/Icons24';
import WatchLaterButton from './WatchLaterButton';
import MovieLikes from '../MovieLikes/MovieLikes';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

const MovieItem = ({ movie }: { movie: MovieData }) => {
  const router = useRouter();
  if (!movie.id) return <></>;
  const onClickHandler = (e: any) => {
    if (
      e.target.viewportElement?.classList?.contains('watch-later') ||
      e.target.viewportElement?.classList?.contains('movie-like')
    ) {
      return;
    } else {
      router.push(`/detail/${movie.id}`);
    }
  };

  return (
    <Card
      className="mx-2 sm:mx-0 w-max-[140px] sm:w-max-[210px] w-[140px] sm:w-[240px]"
      hoverable
      size="small"
      onClick={(e) => onClickHandler(e)}
      cover={
        <>
          <img
            className="h-[210px] sm:h-[360px]"
            alt="example"
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
          />
          <span className="sr-only">Movie Poster</span>
        </>
      }
    >
      <div className="bg-gray-800 bg-opacity-30 rounded-xl py-1 px-1 absolute top-1 right-1 sm:top-2 sm:right-2 flex flex-col gap-[6px] items-center">
        <WatchLaterButton movieId={movie.id} />
        <MovieLikes movieid={movie.id} />
      </div>
      <Meta
        title={movie.title}
        description={
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <span className="text-[14px]">{movie.release_date}</span>
            </div>
            <div className="flex gap-[3px] sm:gap-[6px] items-center">
              <StarFill />
              <span>{(movie.vote_average / 2).toFixed(1)}</span>
            </div>
            <Link className="hidden" href={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}></Link>
          </div>
        }
      />

      {/* <div className="providers"></div> */}
    </Card>
  );
};

export default MovieItem;
