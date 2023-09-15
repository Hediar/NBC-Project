import React from 'react';
import RelatedDiscussionPost from './RelatedDiscussionPost';
import { getDiscussionPostDetail, getDiscussionPostOption, getRelatedDiscussionPost } from '@/api/supabase-discussion';
import Link from 'next/link';
import { ArrowRight2 } from '@/styles/icons/Icons24';

interface Props {
  discussionId: string;
}

const RelatedDiscussionList = async ({ discussionId }: Props) => {
  const postData = await getDiscussionPostDetail(+discussionId);
  const relatedData = await getRelatedDiscussionPost({ genreIds: postData.movie_genreIds, movieId: postData.movie_id });

  return (
    <div className="mt-10 w-full sm:min-h-screen rounded-xl sm:rounded-none sm:relative sm:pl-[2%]">
      <div className="w-full flex justify-between">
        <p className="text-neutral-800 text-xl lg:text-[32px] font-bold leading-10">관련 토픽</p>
        <Link
          href={'/discussion/list'}
          className="flex text-neutral-800 text-base lg:text-xl font-normal leading-normal p-2 lg:p-1"
        >
          전체보기
          <ArrowRight2 />
        </Link>
      </div>

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
        <div className="mt-5 p-2 lg:p-10 text-center border-2 border-gray-300 rounded-lg">
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
