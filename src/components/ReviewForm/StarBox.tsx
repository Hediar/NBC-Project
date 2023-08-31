'use client';

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
    <>
      <span className="inline-block relative text-[32px] text-gray-300">
        ★★★★★
        <span
          style={{ width: `${rating * 20}%` }}
          className={`absolute left-0 w-[${rating * 20}%] text-rose-500 overflow-hidden pointer-events-none`}
        >
          ★★★★★
        </span>
        <input
          className="absolute w-[100%] h-[100%] left-0 opacity-0"
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
      {rating}
    </>
  );
};

export default StarBox;
