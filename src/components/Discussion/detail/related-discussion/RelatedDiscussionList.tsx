import React from 'react';
import RelatedDiscussionPost from './RelatedDiscussionPost';
import { getDiscussionPostDetail, getDiscussionPostOption, getRelatedDiscussionPost } from '@/api/supabase-discussion';
import Link from 'next/link';

type Props = {
  discussionId: string;
};

const RelatedDiscussionList = async ({ discussionId }: Props) => {
  const postData = await getDiscussionPostDetail(+discussionId);
  const relatedData = await getRelatedDiscussionPost({ genreIds: postData.movie_genreIds, movieId: postData.movie_id });
  return (
    <div className="w-full bg-[#EBEBEB] h-screen p-10 pr-0 sm:mx-10">
      <p className="font-bold text-xl h3_suit">관련 토픽</p>
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
        <div className="mt-5 p-10 text-center border-2 border-gray-300 rounded-lg">
          <p className="mb-5">관련된 토론글이 없습니다.</p>
          <Link
            href={`/discussion/regist`}
            className="border border-gray-400 rounded-lg p-1 hover:bg-gray-400 active:text-gray-400 active:bg-white"
          >
            토론글 작성하러 가기
          </Link>
        </div>
      )}
    </div>
  );
};

export default RelatedDiscussionList;
