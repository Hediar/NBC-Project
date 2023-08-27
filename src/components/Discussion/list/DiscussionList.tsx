'use client';
import React, { useEffect, useState } from 'react';
import DiscussionPost from './DiscussionPost';
import { getDiscussionPost } from '@/api/supabase-discussion';

interface Props {
  pageNum: number;
  searchVal?: string;
}

const DiscussionList = ({ pageNum, searchVal }: Props) => {
  //전체 Discussion 다 가져오고, pageNum, searchVal에 따라 필터해서 보여줌.
  const [data, setData] = useState<DiscussionPost[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data: postData } = await getDiscussionPost();

      setData(postData as DiscussionPost[]);
    };
    getData();
  }, []);

  return (
    <div>
      {data.length ? (
        <>
          {data?.map((post: DiscussionPost) => {
            return <DiscussionPost key={post.post_id} post={post} />;
          })}
        </>
      ) : (
        <></>
      )}

      {pageNum}
      {searchVal && searchVal}
    </div>
  );
};

export default DiscussionList;
