'use client';

import Select from '@/components/common/Select';
import { Close } from '@/styles/icons/Icons24';
import { SearchLined } from '@/styles/icons/Icons32';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import DiscussionRegistBtn from './DiscussionRegistBtn';
import { message } from 'antd';

const DiscussionFilteringBox = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const DISCUSSION_URL = usePathname();
  const searchParams = useSearchParams();
  const searchedQuery = searchParams.get('query');
  const searchedFilter = searchParams.get('filter');

  const [sort, setSort] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSortChange = (value: string) => {
    setSort(value);
    const params = {
      query: searchedQuery ?? '',
      filter: searchedFilter ?? 'all',
      sort: value
    };
    router.push(`${DISCUSSION_URL}?${new URLSearchParams(params).toString()}`);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) {
      messageApi.open({ type: 'warning', content: '검색어를 입력해주세요' });
      return searchInputRef.current!.focus();
    }

    const params = {
      query: query,
      filter: filter ? filter : 'all',
      sort: sort ?? 'new'
    };
    router.push(`${DISCUSSION_URL}?${new URLSearchParams(params).toString()}`);
  };

  const handleResetButton = () => {
    setFilter('');
    setQuery('');
    router.push(`${DISCUSSION_URL}?sort=${sort}`);
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col gap-2 md:flex-row w-full mb-12">
        <Select
          defaultValue="new"
          className="w-28 mr-auto"
          onChange={handleSortChange}
          options={[
            { label: '최신순', value: 'new' },
            { label: '조회순', value: 'view' },
            { label: '투표순', value: 'vote' }
          ]}
        />

        <form className="flex select-search-form" onSubmit={onSubmit}>
          <Select
            defaultValue="all"
            onChange={handleFilterChange}
            options={[
              { label: '전체', value: 'all' },
              { label: '영화 제목', value: 'movie_title' },
              { label: '토론 제목', value: 'discussion_title' },
              { label: '내용', value: 'discussion_content' }
            ]}
          />
          <input
            ref={searchInputRef}
            type="text"
            className="custom_input"
            placeholder="검색어를 입력하세요"
            value={query}
            onChange={handleQueryChange}
          />
          <button type="button" className={query?.length > 0 ? 'visible' : 'invisible'} onClick={handleResetButton}>
            <span className="sr-only">초기화</span>
            <Close />
          </button>
          <button className="ml-2">
            <span className="sr-only">검색</span>
            <SearchLined />
          </button>
        </form>

        <DiscussionRegistBtn />
      </div>
    </>
  );
};

export default DiscussionFilteringBox;
