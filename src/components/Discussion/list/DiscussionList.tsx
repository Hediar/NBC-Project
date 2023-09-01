'use client';
import React from 'react';
import DiscussionPost from './DiscussionPost';
import { getDiscussionPost } from '@/api/supabase-discussion';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import DiscussionFilteringBox from './DiscussionFilteringBox';
import { useSearchParams } from 'next/navigation';

interface Props {
  pageNum: string;
}

const DiscussionList = ({ pageNum }: Props) => {
  const searchParams = useSearchParams();

  const sortQuery = searchParams.get('sort') ?? '';
  const filterQuery = searchParams.get('filter') ?? '';
  const searchQuery = searchParams.get('search') ?? '';

  const { isLoading, isError, data: postData } = useQuery(['discussion_post'], getDiscussionPost);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getPostDataBySortQuery = () => {
    switch (sortQuery) {
      case 'new':
        return postData?.sort((a, b) => b.post_id - a.post_id);
      case 'view':
        return postData?.sort((a, b) => b.view_count - a.view_count);
      case 'vote':
        return postData?.sort((a, b) => b.vote_count - a.vote_count);
      default:
        return postData;
    }
  };

  const getPostDataBySearchQuery = (data: DiscussionPost[]) => {
    switch (filterQuery) {
      case 'all':
        return data.filter(
          (post) =>
            post.movie_title?.includes(searchQuery) ||
            post.title.includes(searchQuery) ||
            post.content.includes(searchQuery)
        );
      case 'movie_title':
        return data.filter((post) => post.movie_title?.includes(searchQuery));
      case 'discussion_title':
        return data.filter((post) => post.title.includes(searchQuery));
      case 'discussion_content':
        return data.filter((post) => post.content.includes(searchQuery));
      default:
        return data;
    }
  };

  const sortedPostData = getPostDataBySortQuery();
  const filteredPostData = getPostDataBySearchQuery(sortedPostData!);
  const showNum = 5;
  const totalPageNum = new Array(Math.ceil(filteredPostData!.length / 5)).fill(0);
  const pagedPostData = filteredPostData?.slice((+pageNum - 1) * showNum, +pageNum * showNum);

  const maxVisiblePageCount = 5;
  let startIndex = 0;
  if (totalPageNum.length > maxVisiblePageCount) {
    startIndex = Math.min(
      Math.max(0, totalPageNum.length - maxVisiblePageCount),
      Math.max(0, +pageNum - Math.ceil(maxVisiblePageCount / 2))
    );
  }

  return (
    <div>
      <DiscussionFilteringBox sortQuery={sortQuery} />

      <div>
        {searchQuery && (
          <p className="border-b text-center">
            &quot;<span className="font-bold">{searchQuery}</span>&quot;와 관련된 {filteredPostData.length} 개의
            토론입니다
          </p>
        )}
        {pagedPostData.length ? (
          pagedPostData?.map((post) => {
            return <DiscussionPost key={post.post_id} post={post} />;
          })
        ) : (
          <p>{`검색어 "${searchQuery}"에 대한 글이 없습니다`}</p>
        )}
      </div>

      <div className="flex justify-center gap-3">
        <Link href={`/discussion/list/${1}?search=${searchQuery}&filter=${filterQuery}&sort=${sortQuery}`}>{`<<`}</Link>
        <Link
          href={`/discussion/list/${
            +pageNum - 1 < 1 ? totalPageNum.length : +pageNum - 1
          }?search=${searchQuery}&filter=${filterQuery}&sort=${sortQuery}`}
        >{`<`}</Link>
        {totalPageNum.map((_, idx) => {
          if (idx >= startIndex && idx < startIndex + maxVisiblePageCount) {
            return (
              <Link
                key={idx}
                href={`/discussion/list/${idx + 1}?search=${searchQuery}&filter=${filterQuery}&sort=${sortQuery}`}
              >
                {+pageNum === idx + 1 ? <strong>{`${idx + 1}`}</strong> : <span>{`${idx + 1}`}</span>}
              </Link>
            );
          }
          return null;
        })}
        <Link
          href={`/discussion/list/${
            +pageNum + 1 > totalPageNum.length ? 1 : +pageNum + 1
          }?search=${searchQuery}&filter=${filterQuery}&sort=${sortQuery}`}
        >{`>`}</Link>
        <Link
          href={`/discussion/list/${totalPageNum.length}?search=${searchQuery}&filter=${filterQuery}&sort=${sortQuery}`}
        >{`>>`}</Link>
      </div>
    </div>
  );
};

export default DiscussionList;
