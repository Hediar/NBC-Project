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
      <div className="flex flex-col">
        <main className="w-full sm:w-2/3 flex flex-col p-5 sm:pl-[10%] sm:pr-[2%]">
          <DiscussionContent movieId={postData?.movie_id} />

          <Suspense fallback={<DiscussionTopicSuspense />}>
            <DiscussionTopic postData={postData} />
          </Suspense>

          <Suspense fallback={<DiscussionCommentContainerSuspense />}>
            <DiscussionCommentContainer discussionId={discussionId} />
          </Suspense>
        </main>

        <section className="w-full p-5 sm:absolute sm:w-1/3 sm:right-0 sm:pr-[10%] bg-[#EBEBEB]">
          <Suspense fallback={<RelatedDiscussionListSuspense />}>
            <RelatedDiscussionList discussionId={discussionId} />
          </Suspense>
        </section>
      </div>
    </>
  );
};

export default DiscussionDetail;
