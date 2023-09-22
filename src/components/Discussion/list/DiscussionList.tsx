'use client';

import React, { useEffect, useState } from 'react';
import DiscussionPost from './DiscussionPost';
import { getDiscussionPost } from '@/api/supabase-discussion';
import debounce from 'lodash/debounce';
import { useSearchParams } from 'next/navigation';
import { ArrowDown } from '@/styles/icons/Icons24';

const searchP = 'h3_suit flex justify-center my-16';
const showNum = 5;

const DiscussionList = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [postData, setPostData] = useState<DiscussionPost[]>([]);
  const [filteredData, setFilteredData] = useState<DiscussionPost[]>([]);
  const [slicedData, setSlicedData] = useState<DiscussionPost[]>([]);
  const searchParams = useSearchParams();

  const params = {
    rangeNum: pageNum,
    sort: searchParams.get('sort') ?? '',
    filter: searchParams.get('filter') ?? '',
    query: searchParams.get('query') ?? ''
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPostData = await getDiscussionPost();
      if (fetchedPostData) setPostData(fetchedPostData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const { rangeNum, sort, filter, query } = params;
    if (postData.length) {
      const getSortedData = (data: DiscussionPost[]) => {
        return data.slice().sort((a, b) => {
          switch (sort) {
            case 'new':
              return b.post_id - a.post_id;
            case 'view':
              return b.view_count - a.view_count;
            case 'vote':
              return b.vote_count - a.vote_count;
            default:
              return 0;
          }
        });
      };

      const getFilteredData = (data: DiscussionPost[]) => {
        return data.filter((post) => {
          if (filter === 'all') {
            return post.movie_title?.includes(query) || post.title.includes(query) || post.content.includes(query);
          } else if (filter === 'movie_title') {
            return post.movie_title?.includes(query);
          } else if (filter === 'discussion_title') {
            return post.title.includes(query);
          } else if (filter === 'discussion_content') {
            return post.content.includes(query);
          }
          return true;
        });
      };

      const sortedData = getSortedData(postData);
      const filteredData = getFilteredData(sortedData);
      const hasNextPage = !!filteredData.slice(rangeNum * showNum).length;

      setFilteredData(filteredData);
      setSlicedData(filteredData.slice(0, rangeNum * showNum));
      setHasNextPage(hasNextPage);
    }
  }, [searchParams, pageNum, postData]);

  const loadMore = () => {
    debounce(() => setPageNum(pageNum + 1), 200)();
  };

  return (
    <div className="">
      {params.query && (
        <p className={`${searchP}`}>
          "{params.query}"와 관련된 {filteredData.length}개의 토론입니다
        </p>
      )}
      <div className="flex flex-col gap-5 mt-4">
        {!!slicedData?.length &&
          slicedData?.map((post) => {
            return <DiscussionPost key={post.post_id} post={post} />;
          })}
      </div>
      {hasNextPage && !!slicedData?.length && (
        <button className="full_button my-16" onClick={loadMore}>
          더보기
          <ArrowDown />
        </button>
      )}
    </div>
  );
};

export default DiscussionList;
