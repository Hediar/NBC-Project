'use client';

import React, { useEffect, useState } from 'react';
import DiscussionPost from './DiscussionPost';
import { getDiscussionPost } from '@/api/supabase-discussion';
import { debounce } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { ArrowDown } from '@/styles/icons/Icons24';

const searchP = 'h3_suit flex justify-center my-16';

const DiscussionList = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [postData, setPostData] = useState<DiscussionPost[]>([]);
  const [filteredData, setFilteredData] = useState<DiscussionPost[]>([]);
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
    const showNum = 5;
    if (postData.length) {
      const getPostDataBySortQuery = (): DiscussionPost[] => {
        switch (sort) {
          case 'new':
            return postData.slice().sort((a, b) => b.post_id - a.post_id);
          case 'view':
            return postData.slice().sort((a, b) => b.view_count - a.view_count);
          case 'vote':
            return postData.slice().sort((a, b) => b.vote_count - a.vote_count);
          default:
            return postData.slice();
        }
      };

      const getPostDataBySearchQuery = (data: DiscussionPost[]) => {
        switch (filter) {
          case 'all':
            return data.filter(
              (post) => post.movie_title?.includes(query) || post.title.includes(query) || post.content.includes(query)
            );
          case 'movie_title':
            return data.filter((post) => post.movie_title?.includes(query));
          case 'discussion_title':
            return data.filter((post) => post.title.includes(query));
          case 'discussion_content':
            return data.filter((post) => post.content.includes(query));
          default:
            return data;
        }
      };

      const sortedData = getPostDataBySortQuery();
      const filteredData = getPostDataBySearchQuery(sortedData).slice(0, rangeNum * showNum);
      const hasNextPage = !!getPostDataBySearchQuery(sortedData).slice(rangeNum * showNum).length;

      setFilteredData(filteredData);
      setHasNextPage(hasNextPage);
    }
  }, [searchParams, pageNum, postData]);

  return (
    <div className="">
      {params.query && (
        <p className={`${searchP}`}>
          "{params.query}"와 관련된 {filteredData.length}개의 토론입니다
        </p>
      )}
      <div className="flex flex-col gap-5 mt-4">
        {!!filteredData?.length &&
          filteredData?.map((post) => {
            return <DiscussionPost key={post.post_id} post={post} />;
          })}
      </div>
      {hasNextPage && !!filteredData?.length && (
        <button
          className="full_button my-16"
          onClick={() => {
            debounce(() => setPageNum(pageNum + 1), 200)();
          }}
        >
          더보기
          <ArrowDown />
        </button>
      )}
    </div>
  );
};

export default DiscussionList;
