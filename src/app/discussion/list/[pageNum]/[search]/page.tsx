import DiscussionList from '@/components/Discussion/DiscussionList';
import React from 'react';

interface Props {
  params: {
    pageNum: string;
    search: string;
  };
}

const DiscussionListSearchPage = ({ params }: Props) => {
  const { pageNum, search } = params;
  const searchString = decodeURIComponent(search);

  //   console.log('디코딩==>', searchString);

  return (
    <div>
      <DiscussionList pageNum={+pageNum} searchVal={searchString} />
    </div>
  );
};

export default DiscussionListSearchPage;
