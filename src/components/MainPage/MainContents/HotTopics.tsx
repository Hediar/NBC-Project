import { getHotDiscussionPost } from '@/api/supabase-discussion';
import { ArrowRight, ArrowRight2 } from '@/styles/icons/Icons24';
import Link from 'next/link';

export const revalidate = 0;

const HotTopics = async () => {
  const discussionData = await getHotDiscussionPost();

  return (
    <>
      <div className="md:mx-[190px] py-[100px]">
        <div className="flex flex-col sm:flex-wrap justify-between items-end mt-[100px] mb-[120px]">
          <h1 className="h3_suit mx-auto xl:text-6xl leading-[72px]">🔥지금 핫한 토픽</h1>
          <Link href={'/discussion/list'} className="flex p-5 sm:p-0">
            더보기 <ArrowRight2 />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {discussionData!.map((post) => (
            <Link
              href={`/discussion/detail/${post.post_id}`}
              key={post.id}
              className="drop-shadow-lg bg-GreyScaleWhite border-GreyScaleSilverGrey p-4 rounded-md relative flex flex-col justify-between"
            >
              <div className="mb-8">
                <div className="text-lg font-semibold">{post.movie_title}</div>
                <div className="text-xl font-bold mb-2">{post.title}</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-GreyScaleSilverGrey rounded-md p-3 mt-4">
                <div className="text-sm font-medium">
                  👆투표수 {post.vote_count} 💬댓글수 {post.comment_count}
                </div>
                <div className="absolute bottom-2 right-2 text-3xl text-gray-400">
                  <ArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HotTopics;
