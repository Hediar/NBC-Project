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
    <div className="p-5 bg-slate-100 rounded-md">
      <strong>{CATEGORY.title}</strong>
      <ul>
        {CATEGORY.options.map((item, i) => (
          <li key={item + i} className="block w-full my-2">
            <input
              type="checkbox"
              checked={checkedList.includes(item)}
              onChange={(e) => checkHandler(e, item)}
              value={item}
              className="hidden peer"
              id={`${cateName}_${i}`}
              name={cateName}
            />
            <label
              htmlFor={`${cateName}_${i}`}
              className="flex items-center justify-between w-auto p-2 font-medium tracking-tight border rounded-md cursor-pointer bg-brand-light text-brand-black bg-white border-gray-200 peer-checked:text-teal-700 peer-checked:bg-teal-100 peer-checked:border-teal-300  peer-checked:decoration-brand-dark peer-checked:font-bold"
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
