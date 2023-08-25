import DiscussionDetail from '@/components/Discussion/DiscussionDetail';
import { Params } from '@/types/types';
import React from 'react';

type Props = {
  params: Params;
};

const page = ({ params }: Props) => {
  const { discussionId } = params;
  return (
    <div>
      <DiscussionDetail discussionId={discussionId} />
    </div>
  );
};

export default page;
