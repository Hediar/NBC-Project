import React, { Suspense } from 'react';
import { getDiscussionPostDetail } from '@/api/supabase-discussion';

import DiscussionCommentContainer from './comment/DiscussionCommentContainer';
import ViewCount from './ViewCount';
import DiscussionContent from './DiscussionContent';
import DiscussionTopic from './DiscussionTopic';
import RelatedDiscussionList from './related-discussion/RelatedDiscussionList';
import DiscussionTopicSuspense from './DiscussionTopicSuspense';
import DiscussionCommentContainerSuspense from './comment/DiscussionCommentContainerSuspense';
import RelatedDiscussionListSuspense from './related-discussion/RelatedDiscussionListSuspense';

interface Props {
  discussionId: string;
}

const DiscussionDetail = async ({ discussionId }: Props) => {
  const postData = await getDiscussionPostDetail(+discussionId);

  return (
    <>
      <ViewCount postId={postData.post_id} viewCount={postData.view_count} />
      <div className="flex">
        <main className="w-full flex flex-col relative">
          <DiscussionContent movieId={postData?.movie_id} />

          <Suspense fallback={<DiscussionTopicSuspense />}>
            <DiscussionTopic postData={postData} />
          </Suspense>

          <Suspense fallback={<DiscussionCommentContainerSuspense />}>
            <DiscussionCommentContainer discussionId={discussionId} />
          </Suspense>

          <section className="w-full sm:absolute sm:w-1/3 sm:left-2/3">
            <Suspense fallback={<RelatedDiscussionListSuspense />}>
              <RelatedDiscussionList discussionId={discussionId} />
            </Suspense>
          </section>
        </main>
      </div>
    </>
  );
};

export default DiscussionDetail;
