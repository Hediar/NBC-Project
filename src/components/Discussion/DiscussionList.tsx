import React from 'react';

type Props = {
  pageNum: number;
  searchVal?: string;
};

const DiscussionList = ({ pageNum, searchVal }: Props) => {
  //전체 Discussion 다 가져오고, pageNum, searchVal에 따라 필터해서 보여줌.
  return <div>DiscussionList</div>;
};

export default DiscussionList;
