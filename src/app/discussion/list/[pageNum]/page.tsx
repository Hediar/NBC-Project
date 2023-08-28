import DiscussionList from '@/components/Discussion/list/DiscussionList';
import React from 'react';

interface Props {
  params: { pageNum: string };
}

const DiscussionListPage = ({ params }: Props) => {
  const { pageNum } = params;

  return (
    <div>
      <DiscussionList pageNum={+pageNum} />
    </div>
  );
};

export default DiscussionListPage;
