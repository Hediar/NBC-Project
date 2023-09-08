'use client';
import React, { useEffect, useState } from 'react';
import DiscussionPost from './DiscussionPost';
import { getDiscussionPost } from '@/api/supabase-discussion';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import DiscussionFilteringBox from './DiscussionFilteringBox';
import { useSearchParams } from 'next/navigation';

const DiscussionList = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [postData, setPostData] = useState<DiscussionPost[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedPostData = await getDiscussionPost(pageNum);
      setPostData([...postData, ...fetchedPostData!]);
    };
    fetchData();
  }, [pageNum]);

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex flex-col gap-5">
        {postData?.length
          ? postData?.map((post: any, index: number) => {
              return <DiscussionPost key={index} post={post} />;
            })
          : null}
      </div>
      <button
        onClick={() => {
          setPageNum(pageNum + 1);
        }}
      >
        더보기
      </button>
    </div>
  );
};

export default DiscussionList;
