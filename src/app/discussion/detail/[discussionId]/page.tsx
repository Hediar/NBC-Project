import DiscussionDetail from '@/components/Discussion/detail/DiscussionDetail';
import DiscussionCommentContainer from '@/components/Discussion/detail/comment/DiscussionCommentContainer';
import supabase from '@/supabase/config';
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
      <DiscussionCommentContainer discussionId={discussionId} />
    </div>
  );
};

export default DiscussionDetailPage;
