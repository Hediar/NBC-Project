import { getMovieDetail } from '@/api/tmdb';
import AppearanceProduction from '@/components/MovieDetail/appearance-production/AppearanceProduction';
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
      <AppearanceProduction movieData={movieData} />
    </div>
  );
};

export default page;
