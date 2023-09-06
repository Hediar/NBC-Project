import React from 'react';

interface Props {
  params: {
    movieId: string;
  };
}

const DetailReviewPage = async ({ params }: Props) => {
  const { movieId } = params;

  return <div></div>;
};

export default DetailReviewPage;
