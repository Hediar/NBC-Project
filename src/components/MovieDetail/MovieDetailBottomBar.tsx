'use client';
import React, { useState } from 'react';
import MovieDetailQuickRating from './MovieDetailQuickRating';
import MovieDetailTrailer from './MovieDetailTrailer';

type Props = {
  movieId: string;
};

const MovieDetailBottomBar = ({ movieId }: Props) => {
  const [toShow, setToShow] = useState<string>('주요정보');
  const tags = ['주요정보', '출연/제작', '영상/포토', '평점', '토론'];

  return (
    <div>
      <div className="flex gap-7">
        {tags.map((tag, idx) => {
          return (
            <button key={idx} onClick={() => setToShow(tag)}>
              {tag}
            </button>
          );
        })}
      </div>
      {toShow === '주요정보' && <div>주요정보</div>}
      {toShow === '출연/제작' && <div>출연/제작</div>}
      {toShow === '영상/포토' && <MovieDetailTrailer />}
      {toShow === '평점' && <MovieDetailQuickRating movieId={movieId} />}
      {toShow === '토론' && <div>토론</div>}
    </div>
  );
};

export default MovieDetailBottomBar;
