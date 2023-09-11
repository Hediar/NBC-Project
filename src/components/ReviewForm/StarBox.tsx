'use client';

import { StarFilled, StarLined } from '@/styles/icons/Icons32';
import React, { useEffect } from 'react';

type Props = {
  fieldName?: string;
  setValue?: any;
  defaultValue: number;
  readOnly?: boolean;
};

const StarBox = ({ fieldName, setValue, defaultValue, readOnly = false }: Props) => {
  const [rating, setRating] = React.useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(+e.target.value);
    setValue(fieldName, +e.target.value);
  };

  useEffect(() => {
    setRating(defaultValue || 0);
  }, [defaultValue]);

  return (
    <div className="flex items-center gap-1">
      <span className="inline-block relative text-[32px] text-gray-300">
        <span className="flex w-40">
          <StarLined />
          <StarLined />
          <StarLined />
          <StarLined />
          <StarLined />
        </span>
        <span
          style={{ width: `${rating * 20}%` }}
          className={`absolute top-0 left-0 w-[${rating * 20}%] text-rose-500 overflow-hidden pointer-events-none`}
        >
          <span className="flex w-40">
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
          </span>
        </span>
        <input
          className="absolute top-0 w-[100%] h-[100%] left-0 opacity-0 cursor-pointer disabled:cursor-default"
          type="range"
          onChange={handleChange}
          value={rating}
          step="0.5"
          min="0"
          max="5"
          readOnly={readOnly}
          disabled={readOnly}
        />
      </span>
      <span className="text-center text-zinc-500 text-xs font-normal leading-none">{rating}</span>
    </div>
  );
};

export default StarBox;
