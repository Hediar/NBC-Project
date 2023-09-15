'use client';
import React from 'react';
import Select from '../common/Select';

const Sort = ({
  sortingOption,
  setSortingOption
}: {
  sortingOption: string;
  setSortingOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSortingChange = (value: string) => {
    setSortingOption(value);
  };

  const sortingOptions = [
    { value: 'popularity', label: '인기순' },
    { value: 'primary_release_date', label: '최신순' },
    { value: 'vote_average', label: '별점순' }
  ];

  return (
    <div className="w-28 mr-auto">
      <Select defaultValue="new" className="w-28 mr-auto" onChange={handleSortingChange} options={sortingOptions} />
    </div>
  );
};

export default Sort;
