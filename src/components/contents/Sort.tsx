'use client';
import React, { useState } from 'react';
import Sorting from '../common/Sorting';

const Sort = () => {
  const [sortingOption, setSortingOption] = useState('popularity');

  const handleSortingChange = (value: string) => {
    setSortingOption(value);
  };

  const sortingOptions = [
    { value: 'popularity', label: '인기순' },
    { value: 'release_date', label: '개봉일순' },
    { value: 'vote_average', label: '별점순' }
  ];

  return (
    <div>
      <Sorting options={sortingOptions} selectedOption={sortingOption} onChange={handleSortingChange} />
    </div>
  );
};

export default Sort;
