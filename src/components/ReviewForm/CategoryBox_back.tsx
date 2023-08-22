import useCheckbox from '@/hooks/useCheckbox';
import React from 'react';

type Props = {
  CATEGORY: any;
  categoryInd: number;
  chechedCategories: any[];
  setChechedCategories: React.Dispatch<React.SetStateAction<any[]>>;
};

const CategoryBox = ({ CATEGORY, categoryInd, chechedCategories, setChechedCategories }: Props) => {
  const [checkedList, checkHandler] = useCheckbox();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    // console.log('chechedCategories => ', chechedCategories);
    checkHandler(e, data);
    console.log('데이타 => ', data);
    console.log('checkedList => ', checkedList);

    // setChechedCategories((prev) => {
    //   const copy = prev;
    //   console.log('checkedList => ', checkedList, '/prev => ', prev);
    //   copy[categoryInd] = {
    //     title: CATEGORY.title,
    //     options: checkedList
    //   };
    //   return copy;
    // });

    // setChechedCategories((prev) => (prev[categoryInd] = { ...prev[categoryInd], options: checkedList }));
    // console.log('되나? ==> ', checkedList);
  };

  return (
    <div>
      <strong>{CATEGORY.title}</strong>
      <ul>
        {CATEGORY.options.map((data: string, i: number) => (
          <li key={data + i}>
            <label>
              <input
                type="checkbox"
                checked={checkedList.includes(data)}
                onChange={(e) => changeHandler(e, data)}
                value={data}
              />
              {data}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryBox;
