'use client';

import React from 'react';

type Props = {
  CATEGORY: {
    title: string;
    options: string[];
  };
  boxIndex: number;
  checkedList: string[];
  checkHandler: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};

const CategoryBox = ({ CATEGORY, boxIndex, checkedList, checkHandler }: Props) => {
  const cateName = `cate${boxIndex}`;

  return (
    <div className="category-box">
      <strong className='block mb-3 text-neutral-800 text-base font-bold leading-snug'>{CATEGORY.title}</strong>
      <ul>
        {CATEGORY.options.map((item, i) => (
          <li key={item + i} className="my-2">
            <input
              type="checkbox"
              checked={checkedList && checkedList.includes(item)}
              onChange={(e) => checkHandler(e, item)}
              value={item}
              className="peer sr-only"
              id={`${cateName}_${i}`}
              name={cateName}
            />
            <label
              htmlFor={`${cateName}_${i}`}
              className="inline-block my-[1px] px-4 py-2 bg-white rounded-3xl border border-zinc-300 text-neutral-800 text-base font-normal leading-snug cursor-pointer peer-checked:border-2 peer-checked:my-0"
            >
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryBox;
