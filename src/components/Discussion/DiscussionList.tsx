import React from 'react';

interface Props {
  pageNum: number;
  searchVal?: string;
}

const DiscussionList = ({ pageNum, searchVal }: Props) => {
  //전체 Discussion 다 가져오고, pageNum, searchVal에 따라 필터해서 보여줌.
  return (
    <div>
      {pageNum}
      {searchVal && searchVal}
    </div>
  );
};

export default DiscussionList;
