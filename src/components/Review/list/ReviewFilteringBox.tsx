'use client';

import { Select, Space } from 'antd';
import Search from 'antd/es/input/Search';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ReviewFilteringBox = () => {
  const router = useRouter();
  const REVIEW_URL = '/review';

  const [sort, setSort] = useState<string>();
  const [filter, setFilter] = useState<string>();

  const handleSortChange = (value: string) => {
    setSort(value);
    router.push(`${REVIEW_URL}?sort=${value}`);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const onSearch = (value: string) => {
    router.push(`${REVIEW_URL}?sort=${sort}&filter=${filter}&q=${value}`);
  };

  return (
    <div className="flex w-full mb-12">
      <Select
        defaultValue="new"
        className='w-28 mr-auto'
        onChange={handleSortChange}
        options={[
          { value: 'new', label: '최신순' },
          { value: 'likes', label: '좋아요순' },
          { value: 'rating', label: '별점순' }
        ]}
      />

      <Space.Compact>
        <Select
          defaultValue="all"
          className='w-28'
          onChange={handleFilterChange}
          options={[
            { value: 'all', label: '전체' },
            { value: 'movie_title', label: '영화제목' },
            { value: 'review_cont', label: '리뷰내용' }
          ]}
        />
        <Search placeholder="input search text" onSearch={onSearch} className='w-52' />
      </Space.Compact>

      <Link href={'/review/write'} className='button-dark ml-2'>리뷰 작성</Link>
    </div>
  );
};

export default ReviewFilteringBox;
