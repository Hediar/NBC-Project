// import { useState } from 'react';
import { Dispatch, SetStateAction, useCallback, useState, ChangeEvent } from 'react';

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
// type ReturnTypes = [T, (e: ChangeEvent) => void, Dispatch<SetStateAction>];
const useCheckbox = () => {
  // state
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState<any>([]);

  // handler
  const checkedItemHandler = (value: any, isChecked: any) => {
    if (isChecked) {
      setCheckedList((prev: any): any => [...prev, value]);
    } else if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    }
  };
  const checkHandler = (e: any, value: any) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  return [checkedList as any, checkHandler as any, setCheckedList as any];
};

export default useCheckbox;
