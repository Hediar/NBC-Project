import { Params } from '@/types/types';
import React from 'react';

type Props = {
  params: Params;
};

const page = ({ params }: Props) => {
  const { movieId } = params;
  return <div>page</div>;
};

export default page;
