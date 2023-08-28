'use client';
import React, { useEffect, useState } from 'react';
import DiscussionPost from './DiscussionPost';
import { getDiscussionPost } from '@/api/supabase-discussion';
import { useQuery } from '@tanstack/react-query';

interface Props {
  pageNum: number;
  searchVal?: string;
}

const DiscussionList = ({ pageNum, searchVal }: Props) => {
  //전체 Discussion 다 가져오고, pageNum, searchVal에 따라 필터해서 보여줌.
  const { isLoading, isError, data: postData } = useQuery(['discussion_post'], getDiscussionPost);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {postData?.map((post: DiscussionPost) => {
        return <DiscussionPost key={post.post_id} post={post} />;
      })}

      {pageNum}
      {searchVal && searchVal}
    </div>
  );
};

export default DiscussionList;
