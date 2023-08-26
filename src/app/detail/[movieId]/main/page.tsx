import { getMovieDetail } from '@/api/tmdb';
import KeyInfomation from '@/components/MovieDetail/main/KeyInfomation';
import React from 'react';

interface Props {
  params: {
    movieId: string;
  };
}

const DetailMainPage = async ({ params }: Props) => {
  const { movieId } = params;
  const movieData = await getMovieDetail(movieId);
  return (
    <div>
      <KeyInfomation movieData={movieData} />
    </div>
  );
};

export default DetailMainPage;
