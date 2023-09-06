import React from 'react';
import { getDiscussionPostDetail } from '@/api/supabase-discussion';

import DiscussionCommentContainer from './comment/DiscussionCommentContainer';
import ViewCount from './ViewCount';
import DiscussionContent from './DiscussionContent';
import DiscussionTopic from './DiscussionTopic';
import RelatedDiscussionList from './related-discussion/RelatedDiscussionList';

interface Props {
  discussionId: string;
}

const DiscussionDetail = async ({ discussionId }: Props) => {
  const postData = await getDiscussionPostDetail(+discussionId);

  return (
    <>
      <ViewCount postId={postData.post_id} viewCount={postData.view_count} />
      <div className="flex">
        <main className="w-2/3 pr-10">
          <DiscussionContent movieId={postData?.movie_id} />
          <DiscussionTopic postData={postData} />
          <DiscussionCommentContainer discussionId={discussionId} />
        </main>

        <section className="w-1/3">
          <RelatedDiscussionList discussionId={discussionId} />
        </section>
      </div>
    </>
  );
};

export default DiscussionDetail;
