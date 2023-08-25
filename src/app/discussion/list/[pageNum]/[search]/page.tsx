import DiscussionList from '@/components/Discussion/DiscussionList';
import { Params } from '@/types/types';
import React from 'react';

type Props = {
  params: Params;
};

const page = ({ params }: Props) => {
  const { pageNum, search } = params;
  const searchString = decodeURIComponent(search);

  //   console.log('디코딩==>', searchString);

  return (
    <div>
      <DiscussionList pageNum={+pageNum} searchVal={searchString} />
    </div>
  );
};

export default page;
