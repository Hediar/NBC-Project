import React from 'react';

interface Props {
  params: { movieId: string };
}

const DetailDiscussionPage = ({ params }: Props) => {
  const { movieId } = params;
  return <div>{/* <Discussion /> */}</div>;
};

export default DetailDiscussionPage;
