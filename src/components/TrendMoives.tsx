// 'use client';
import { getMovieList } from '@/api/movie';
// import React, { useEffect } from 'react';

const TrendMoives = () => {
  const MovieList = async () => {
    let res = await getMovieList();
    console.log('data', res);
  };
  MovieList();
  return <div>TrendMoives</div>;
};

export default TrendMoives;
