import { getMovieDetail } from '@/api/tmdb';
import AppearanceProduction from '@/components/MovieDetail/appearance-production/AppearanceProduction';
import React from 'react';

interface Props {
  params: { movieId: string };
}

const DetailCrewPage = async ({ params }: Props) => {
  const { movieId } = params;
  const movieData = await getMovieDetail(movieId);
  return (
    <div>
      <AppearanceProduction movieData={movieData} />
    </div>
  );
};

export default DetailCrewPage;
