import DiscussionList from '@/components/Discussion/list/DiscussionList';
import React, { Suspense } from 'react';
import DiscussionListSuspense from '@/components/Discussion/list/DiscussionListSuspense';
import DiscussionFilteringBox from '@/components/Discussion/list/DiscussionFilteringBox';

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
