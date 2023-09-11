import React from 'react';

interface Props {
  params: {
    movieId: string;
  };
}

const DetailMainPage = async ({ params }: Props) => {
  const { movieId } = params;

  return <div></div>;
};

export default DetailMainPage;
