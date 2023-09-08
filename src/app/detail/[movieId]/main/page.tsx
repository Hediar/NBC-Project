import KeyInfomation from '@/components/MovieDetail/main/KeyInfomation';
import React from 'react';

interface Props {
  params: {
    movieId: string;
  };
}

const DetailMainPage = async ({ params }: Props) => {
  const { movieId } = params;

  return (
    <div>
      <KeyInfomation movieId={movieId} />
    </div>
  );
};

export default DetailMainPage;
