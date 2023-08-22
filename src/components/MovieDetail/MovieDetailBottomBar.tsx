'use client';
import React, { useState } from 'react';
import MovieDetailQuickRating from './MovieDetailQuickRating';
import MovieDetailTrailer from './MovieDetailTrailer';
import { MovieData } from '@/types/types';
import KeyInfomation from './KeyInfomation';
import AppearanceProduction from './AppearanceProduction';

type Props = {
  movieId: string;
  movieData: MovieData;
};

const MovieDetailBottomBar = ({ movieId, movieData }: Props) => {
  const [toShow, setToShow] = useState<string>('주요정보');
  const tags = ['주요정보', '출연/제작', '영상/포토', '평점', '토론'];

  return (
    <div>
      <div className="flex gap-7 py-5 mb-5">
        {tags.map((tag, idx) => {
          return (
            <button key={idx} onClick={() => setToShow(tag)}>
              {tag}
            </button>
          );
        })}
      </div>
      {toShow === '주요정보' && <KeyInfomation />}
      {toShow === '출연/제작' && <AppearanceProduction movieData={movieData} />}
      {toShow === '영상/포토' && <MovieDetailTrailer movieData={movieData} />}
      {toShow === '평점' && <MovieDetailQuickRating movieId={movieId} />}
      {toShow === '토론' && <div>토론</div>}
    </div>
  );
};

export default MovieDetailBottomBar;
