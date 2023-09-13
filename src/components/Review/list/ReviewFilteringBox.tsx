'use client';

import Select from '@/components/common/Select';
import { Close } from '@/styles/icons/Icons24';
import { SearchLined } from '@/styles/icons/Icons32';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import WriteButton from './WriteButton';

const ReviewFilteringBox = () => {
  const router = useRouter();
  const REVIEW_URL = '/review';

  const [sort, setSort] = useState<string>();
  const [filter, setFilter] = useState<string>();
  const [query, setQuery] = useState<string>('');

  const handleSortChange = (value: string) => {
    setSort(value);
    router.push(`${REVIEW_URL}?sort=${value}`);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${REVIEW_URL}?sort=${sort}&filter=${filter}&q=${query}`);
  };

  const handleResetButton = () => {
    setFilter('');
    setQuery('');
    router.push(`${REVIEW_URL}?sort=${sort}`);
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row w-full mb-12">
      <Select
        defaultValue="new"
        className="w-28 mr-auto"
        onChange={handleSortChange}
        options={[
          { value: 'new', label: '최신순' },
          { value: 'likes', label: '좋아요순' },
          { value: 'rating', label: '별점순' }
        ]}
      />

      <form className="flex select-search-form" onSubmit={onSubmit}>
        <Select
          defaultValue="all"
          onChange={handleFilterChange}
          options={[
            { value: 'all', label: '전체' },
            { value: 'movie_title', label: '영화제목' },
            { value: 'review_cont', label: '리뷰내용' }
          ]}
        />
        <input
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

      <WriteButton />
    </div>
  );
};

export default ReviewFilteringBox;
