import DiscussionDetail from '@/components/Discussion/detail/DiscussionDetail';
import DiscussionDetailSuspense from '@/components/Discussion/detail/DiscussionDetailSuspense';
import React, { Suspense } from 'react';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    discussionId: string;
  };
}

const DiscussionDetailPage = async ({ params }: Props) => {
  const { discussionId } = params;

  return (
    <div>
      <Suspense fallback={<DiscussionDetailSuspense />}>
        <DiscussionDetail discussionId={discussionId} />
      </Suspense>
    </div>
  );
};

export default DiscussionDetailPage;
