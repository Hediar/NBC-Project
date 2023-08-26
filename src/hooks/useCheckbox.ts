'use client';
import { Dispatch, SetStateAction, useState } from 'react';

/**
 *
 * @returns
 * <input
        type="checkbox"
        checked={checkedList.includes(item)}
        onChange={(e) => checkHandler(e, item)}
        value={item}
    />
 */
type ReturnTypes = [
  string[],
  (e: React.ChangeEvent<HTMLInputElement>, value: string) => void,
  Dispatch<SetStateAction<string[]>>
];
const useCheckbox = (): ReturnTypes => {
  // state
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  // handler
  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
    } else if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    }
  };
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  return [checkedList, checkHandler, setCheckedList];
};

export default useCheckbox;
