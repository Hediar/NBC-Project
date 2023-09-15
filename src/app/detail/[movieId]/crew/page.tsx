import AppearanceProduction from '@/components/MovieDetail/appearance-production/AppearanceProduction';
import React from 'react';

interface Props {
  params: { movieId: string };
}

const DetailCrewPage = async ({ params }: Props) => {
  const { movieId } = params;

  return (
    <div>
      <AppearanceProduction movieId={movieId} />
    </div>
  );
};

export default DetailCrewPage;
