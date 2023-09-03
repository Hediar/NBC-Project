import React from 'react';
import OptionVote from './OptionVote';
import EditDeleteBox from './EditDeleteBox';
import {
  getDiscussionPostDetail,
  getDiscussionPostOption,
  getNextDiscussionPost,
  getPrevDiscussionPost,
  getRelatedDiscussionPost
} from '@/api/supabase-discussion';
import RelatedDiscussionPost from './related-discussion/RelatedDiscussionPost';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import DiscussionCommentContainer from './comment/DiscussionCommentContainer';

interface Props {
  discussionId: string;
}

export const revalidate = 0;

const DiscussionDetail = async ({ discussionId }: Props) => {
  const postData = await getDiscussionPostDetail(+discussionId);
  const [relatedData, prevPostData, nextPostData] = await Promise.all([
    getRelatedDiscussionPost({ genreIds: postData.movie_genreIds, movieId: postData.movie_id }),
    getPrevDiscussionPost({ postId: postData.post_id, movieId: postData.movie_id }),
    getNextDiscussionPost({ postId: postData.post_id, movieId: postData.movie_id })
  ]);

  return (
    <div className="mt-[50px]">
      <div className="flex justify-between w-4/5 mx-auto">
        <div className="w-2/3">
          <section className="min-h-[40vh] flex flex-col items-center relative">
            <div className="w-full">
              <h3 className="text-3xl font-bold m-5">{postData?.title}</h3>
              <p className="text-xl break-words">{postData?.content}</p>
            </div>

            <OptionVote postId={postData.post_id} voteCount={postData.vote_count} />

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
          <DiscussionCommentContainer discussionId={discussionId} />
        </div>

        <div className="w-[20vw]">
          <p>관련된 다른 토픽</p>
          {relatedData?.length ? (
            relatedData?.map(async (relatedDiscussionData, idx) => {
              if (idx > 3) return null;

              const relatedOption = await getDiscussionPostOption(relatedDiscussionData.post_id);

              return (
                <RelatedDiscussionPost
                  key={relatedDiscussionData.post_id}
                  relatedDiscussionData={relatedDiscussionData}
                  relatedOption={relatedOption!}
                />
              );
            })
          ) : (
            <div className="mt-5 p-10 text-center border rounded-lg">
              <p className="mb-5">관련된 토론글이 없습니다.</p>
              <Link href={`/discussion/regist`} className="border rounded-lg p-1">
                토론글 작성하러 가기
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;
