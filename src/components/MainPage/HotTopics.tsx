import { getHotDiscussionPost } from '@/api/supabase-discussion';
import Link from 'next/link';
import { AiFillRightCircle } from 'react-icons/ai';

const HotTopics = async () => {
  const discussionData = await getHotDiscussionPost();

  return (
    <>
      <div className="p-5">
        <h2 className="text-2xl">핫한 토픽</h2>
        <Link href={'/discussion/list/1'}>더보기 &gt;</Link>
        <div className="grid grid-cols-3 grid-rows-2 gap-4 p-5">
          {discussionData!.map((post) => (
            <Link
              href={`/discussion/detail/${post.post_id}`}
              key={post.id}
              className="bg-gray-200 p-4 rounded-md relative"
            >
              <div className="text-2xl font-bold mb-2">{post.title}</div>
              <div className="bg-gray-100 rounded-md relative p-3">
                <div>
                  {post.contents.map((content: string, idx: number) => (
                    <div key={idx} className={idx === post.contents.length - 1 ? '' : 'mb-2'}>
                      {content} {idx !== post.contents.length - 1 && 'VS'}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm">
                  👆투표수 {post.vote_count} 💬댓글수 {post.comment_count}
                </div>
                <div className="absolute bottom-2 right-2 text-3xl text-gray-400">
                  <AiFillRightCircle />
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
