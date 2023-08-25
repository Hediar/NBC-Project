import { getMovieDetail } from '@/api/tmdb';
import KeyInfomation from '@/components/MovieDetail/main/KeyInfomation';
import { Params } from '@/types/types';
import React from 'react';

type Props = {
  params: Params;
};

const page = async ({ params }: Props) => {
  const { movieId } = params;
  const movieData = await getMovieDetail(movieId);
  return (
    <div>
      <KeyInfomation movieData={movieData} />
    </div>
  );
};

export default page;
