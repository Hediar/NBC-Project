import DiscussionList from '@/components/Discussion/list/DiscussionList';
import React from 'react';
import { Metadata } from 'next';
import DiscussionFilteringBox from '@/components/Discussion/list/DiscussionFilteringBox';

// export const revalidate = 0;

export const metadata: Metadata = {
  title: '토론 - 무비바바'
};

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const DiscussionListPage = ({ searchParams }: Props) => {
  return (
    <div className="wrap">
      <DiscussionFilteringBox sortQuery="" />

      <DiscussionList />
    </div>
  );
};

export default DiscussionListPage;
