import { useState } from 'react';

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
const useCheckbox = () => {
  // state
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  // handler
  const checkedItemHandler = (value, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
    } else if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    }
  };
  const checkHandler = (e, value) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  return [checkedList, checkHandler, setCheckedList];
};

export default useCheckbox;
