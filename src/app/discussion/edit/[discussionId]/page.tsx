import React from 'react';

interface Props {
  params: {
    discussionId: string;
  };
}

const DiscussionEditPage = ({ params }: Props) => {
  const { discussionId } = params;
  //discussionId로 글 가져와서 수정하는 페이지
  return <div>page</div>;
};

export default DiscussionEditPage;
