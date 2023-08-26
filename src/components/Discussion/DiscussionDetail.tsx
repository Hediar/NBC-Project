import React from 'react';

interface Props {
  discussionId: string;
}

const DiscussionDetail = ({ discussionId }: Props) => {
  //discussionId 조회해서 db에서 내용 가져오기.
  return <div>DiscussionDetail</div>;
};

export default DiscussionDetail;
