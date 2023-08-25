import DiscussionList from '@/components/Discussion/DiscussionList';
import { Params } from '@/types/types';
import React from 'react';

type Props = {
  params: Params;
};

const page = ({ params }: Props) => {
  const { pageNum } = params;

  return (
    <div>
      <DiscussionList pageNum={+pageNum} />
    </div>
  );
};

export default page;
