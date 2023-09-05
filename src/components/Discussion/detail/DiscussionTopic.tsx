import Link from 'next/link';
import React from 'react';
import OptionVote from './OptionVote';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import EditDeleteBox from './EditDeleteBox';
import { getDiscussionPostOption, getNextDiscussionPost, getPrevDiscussionPost } from '@/api/supabase-discussion';

type Props = {
  postData: DiscussionPost;
};

const DiscussionTopic = async ({ postData }: Props) => {
  const [prevPostData, nextPostData, optionData] = await Promise.all([
    getPrevDiscussionPost({ postId: postData.post_id, movieId: postData.movie_id }),
    getNextDiscussionPost({ postId: postData.post_id, movieId: postData.movie_id }),
    getDiscussionPostOption(postData.post_id)
  ]);
  return (
    <div className="mt-[50px]">
      <h3 className="h3_suit flex">이 영화 토픽</h3>
      <div className="flex justify-between w-4/5 mx-auto">
        <div className="w-2/3">
          <div className="w-full h-[60px] border rounded-lg"></div>
          <section className="min-h-[40vh] flex flex-col items-center relative">
            <div className="w-full">
              <h3 className="text-3xl font-bold m-5">{postData?.title}</h3>
              <p className="text-xl break-words">{postData?.content}</p>
            </div>

            <OptionVote postId={postData.post_id} voteCount={postData.vote_count} checkUpdate={optionData!.length} />

            {prevPostData?.length ? (
              <Link
                href={`/discussion/detail/${prevPostData[0].post_id}`}
                className="absolute top-1/2 -translate-y-2/4 left-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl"
              >
                <FaChevronLeft />
              </Link>
            ) : null}
            {nextPostData?.length ? (
              <Link
                href={`/discussion/detail/${nextPostData[0].post_id}`}
                className="absolute top-1/2 -translate-y-2/4 right-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl"
              >
                <FaChevronRight />
              </Link>
            ) : null}
          </section>

          <div>
            <EditDeleteBox postId={postData.post_id} authorId={postData.user_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionTopic;
