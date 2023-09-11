import KeyInfomation from '@/components/MovieDetail/main/KeyInfomation';
import KeyInfomationSuspense from '@/components/MovieDetail/main/KeyInfomationSuspense';
import React, { Suspense } from 'react';

interface Props {
  params: {
    movieId: string;
  };
}

const MovieDetail = async ({ params }: Props) => {
  const { movieId } = params;

  return (
    <div>
      <Suspense fallback={<KeyInfomationSuspense />}>
        <KeyInfomation movieId={movieId} />
      </Suspense>
    </div>
  );
};

export default MovieDetail;
