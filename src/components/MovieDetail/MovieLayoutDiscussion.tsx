import supabase from '@/supabase/config';
import Link from 'next/link';
import DiscussionTopic from '../Discussion/detail/DiscussionTopic';
import DiscussionCommentContainer from '../Discussion/detail/comment/DiscussionCommentContainer';
import RelatedDiscussionList from '../Discussion/detail/related-discussion/RelatedDiscussionList';
import { Suspense } from 'react';
import DiscussionTopicSuspense from '../Discussion/detail/DiscussionTopicSuspense';
import DiscussionCommentContainerSuspense from '../Discussion/detail/comment/DiscussionCommentContainerSuspense';
import RelatedDiscussionListSuspense from '../Discussion/detail/related-discussion/RelatedDiscussionListSuspense';

interface Props {
  movieId: string;
}

const MovieLayoutDiscussion = async ({ movieId }: Props) => {
  const { data: discussionPostData } = await supabase
    .from('discussion_post')
    .select('*')
    .eq('movie_id', movieId)
    .order('created_at', { ascending: false })
    .single();

  return (
    <section style={{ width: '80%', margin: '0 auto' }}>
      {discussionPostData?.length ? (
        <div className="flex">
          <main className="w-full flex flex-col relative">
            <Suspense fallback={<DiscussionTopicSuspense />}>
              <DiscussionTopic postData={discussionPostData} />
            </Suspense>

            <Suspense fallback={<DiscussionCommentContainerSuspense />}>
              <DiscussionCommentContainer discussionId={discussionPostData.post_id} />
            </Suspense>

            <section className="w-full sm:absolute sm:w-1/3 sm:left-2/3">
              <Suspense fallback={<RelatedDiscussionListSuspense />}>
                <RelatedDiscussionList discussionId={discussionPostData.post_id} />
              </Suspense>
            </section>
          </main>
        </div>
      ) : (
        <div className="w-full text-center flex flex-col gap-3 mt-[50px]">
          <h3 className="h3_suit flex">이 영화 토픽</h3>
          <p>관련 토픽이 없습니다</p>
          <p>
            이 영화의 <span className="font-bold">첫번째 토픽 주인공</span>이 되어보세요
          </p>
          <Link
            href={`/discussion/regist?movieId=${movieId}`}
            className="border rounded-xl py-1 mb-5 hover:bg-gray-200"
          >
            작성하기
          </Link>
        </div>
      )}
    </section>
  );
};

export default MovieLayoutDiscussion;
