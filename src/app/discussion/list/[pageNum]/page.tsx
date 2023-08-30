import DiscussionList from '@/components/Discussion/list/DiscussionList';
import React from 'react';

interface Props {
  params: { pageNum: string };
  searchParams: { q: string };
}

export const dynamic = 'force-dynamic';

const DiscussionListPage = ({ params, searchParams }: Props) => {
  const { pageNum } = params;

  return (
    <div>
      <DiscussionList pageNum={pageNum} />
    </div>
  );
};

export default DiscussionListPage;
