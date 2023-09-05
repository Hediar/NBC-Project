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
    <div className="w-[20vw]">
      <p className="font-bold text-xl">관련된 다른 토픽</p>
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
  );
};

export default RelatedDiscussionList;
