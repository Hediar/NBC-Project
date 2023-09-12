import DiscussionList from '@/components/Discussion/list/DiscussionList';
import React, { Suspense } from 'react';
import DiscussionFilteringBox from '@/components/Discussion/list/DiscussionFilteringBox';
import DiscussionListSuspense from '@/components/Discussion/list/DiscussionListSuspense';

const DiscussionListPage = () => {
  return (
    <div className="wrap">
      <DiscussionFilteringBox />

      <Suspense fallback={<DiscussionListSuspense />}>
        <DiscussionList />
      </Suspense>
    </div>
  );
};

export default DiscussionListPage;
