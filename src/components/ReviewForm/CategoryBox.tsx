import React from 'react';

type Props = {
  CATEGORY: {
    title: string;
    options: string[];
  };
  checkedList: any;
  checkHandler: any;
};

const CategoryBox = ({ CATEGORY, checkedList, checkHandler }: Props) => {
  return (
    <div>
      <div>
        <strong>{CATEGORY.title}</strong>
        <ul>
          {CATEGORY.options.map((item, i) => (
            <li key={item + i}>
              <label>
                <input
                  type="checkbox"
                  checked={checkedList.includes(item)}
                  onChange={(e) => checkHandler(e, item)}
                  value={item}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryBox;
