import React from 'react';
import OptionVote from './OptionVote';
import DiscussionCommentContainer from './comment/DiscussionCommentContainer';
import EditDeleteBox from './EditDeleteBox';
import { getDiscussionPostDetail } from '@/api/supabase-discussion';

interface Props {
  discussionId: string;
}

export const revalidate = 0;

const DiscussionDetail = async ({ discussionId }: Props) => {
  //discussionId 조회해서 db에서 내용 가져오기.
  const postData = await getDiscussionPostDetail(+discussionId);

  return (
    <div className="flex flex-col justify-center mx-auto">
      <div className="min-h-[60vh] flex flex-col items-center">
        <div className="flex flex-col justify-center mx-auto">
          <h3 className="text-3xl font-bold m-5">{postData.title}</h3>
          <p className="text-xl">{postData.content}</p>
        </div>

        <OptionVote postId={postData.post_id} />
      </div>

      {/* 작성자랑 유저id랑 같을때만 기능하도록 */}
      <div>
        <EditDeleteBox postId={postData.post_id} authorId={postData.user_id} />
      </div>

      <div className="p-5">
        <DiscussionCommentContainer />
      </div>
    </div>
  );
};

export default DiscussionDetail;
