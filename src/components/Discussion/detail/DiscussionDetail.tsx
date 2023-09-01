import React from 'react';
import OptionVote from './OptionVote';
import DiscussionCommentContainer from './comment/DiscussionCommentContainer';
import EditDeleteBox from './EditDeleteBox';
import { getDiscussionPostDetail, getDiscussionPostOption, getRelatedDiscussionPost } from '@/api/supabase-discussion';
import DiscussionContent from './DiscussionContent';
import RelatedDiscussionPost from './related-discussion/RelatedDiscussionPost';
import Link from 'next/link';

interface Props {
  discussionId: string;
}

const DiscussionDetail = async ({ discussionId }: Props) => {
  //discussionId 조회해서 db에서 내용 가져오기.
  const postData = await getDiscussionPostDetail(+discussionId);
  const relatedData = await getRelatedDiscussionPost({ genreIds: postData.movie_genreIds, movieId: postData.movie_id });

  return (
    <div className="">
      <DiscussionContent movieId={postData?.movie_id} />

      <div className="flex justify-between w-4/5 mx-auto">
        <div className="w-2/3">
          <section className="min-h-[60vh] flex flex-col items-center">
            <div className="flex flex-col justify-center mx-auto">
              <h3 className="text-3xl font-bold m-5">
                {postData?.title}
                {postData?.movie_genreIds[0]}
              </h3>
              <p className="text-xl">{postData?.content}</p>
            </div>

            <OptionVote postId={postData.post_id} voteCount={postData.vote_count} />
          </section>

          {/* 작성자랑 유저id랑 같을때만 기능하도록 */}
          <div>
            <EditDeleteBox postId={postData.post_id} authorId={postData.user_id} />
          </div>
        </div>

        <div className="w-[20vw]">
          <p>관련된 다른 토픽</p>
          {relatedData?.length ? (
            relatedData?.map(async (relatedDiscussionData) => {
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
