import DiscussionDetail from '@/components/Discussion/DiscussionDetail';
import React from 'react';

interface Props {
  params: {
    discussionId: string;
  };
}

const DiscussionDetailPage = ({ params }: Props) => {
  const { discussionId } = params;
  return (
    <div>
      <DiscussionDetail discussionId={discussionId} />
    </div>
  );
};

export default DiscussionDetailPage;
