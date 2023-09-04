import DiscussionDetail from '@/components/Discussion/detail/DiscussionDetail';
import React from 'react';

interface Props {
  params: {
    discussionId: string;
  };
}

export const dynamic = 'force-dynamic';

const DiscussionDetailPage = async ({ params }: Props) => {
  const { discussionId } = params;

  return (
    <div>
      <DiscussionDetail discussionId={discussionId} />
    </div>
  );
};

export default DiscussionDetailPage;
