import MovieDetailInfo from '@/components/MovieDetail/MovieDetailInfo';
import { Params } from '@/types/types';
import React from 'react';

type Props = {
  params: Params;
};

const MovieDetail = ({ params }: Props) => {
  const { movieId } = params;

  return <div></div>;
};

export default MovieDetail;
