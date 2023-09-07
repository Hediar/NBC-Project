import DiscussionList from '@/components/Discussion/list/DiscussionList';
import React from 'react';
import { Metadata } from 'next';

interface Props {
  params: { pageNum: string };
  searchParams: { q: string };
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: '토론 - 무비바바'
};

const DiscussionListPage = ({ params, searchParams }: Props) => {
  const { pageNum } = params;

  return (
    <div>
      <DiscussionList pageNum={pageNum} />
    </div>
  );
};

export default DiscussionListPage;
