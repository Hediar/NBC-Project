'use client';

import React, { useEffect } from 'react';

type Props = {
  fieldArray?: any;
  defaultValue: any[];
};

const HashTagBox = ({ fieldArray, defaultValue }: Props) => {
  const { fields, append, remove, replace } = fieldArray;

  console.log('defaultValue => ', defaultValue);

  // onChange로 관리할 문자열
  const [tagItem, setTagItem] = React.useState<string | ''>('');

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    // key(keyCode): Enter(13) spacebar(32) 쉼표(188)
    const isSubmitKey = e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 188;
    if (isSubmitKey && tagItem.length !== 0) {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    const newTagItem = tagItem.trim().replaceAll(',', '');
    append({ value: newTagItem });

    setTagItem('');
  };

  const deleteTagItem = (targetIndex: number) => {
    remove(targetIndex);
  };

  useEffect(() => {
    replace(defaultValue || []);
  }, [defaultValue]);

  return (
    <div className="flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-">
      <ul className="flex flex-wrap">
        {fields.map(({ value }: { value: string }, i: number) => (
          <li
            key={value + i}
            onClick={() => deleteTagItem(i)}
            className="m-1 rounded-full  text-cyan-700 bg-cyan-100 border border-cyan-300 py-1 px-2 text-xs font-medium"
          >
            {value}
          </li>
        ))}
      </ul>
      <input
        className="flex-1 HashInput"
        type="text"
        value={tagItem}
        onChange={(e) => setTagItem(e.target.value)}
        onKeyUp={onKeyUp}
        placeholder="해시태그 입력"
      />
    </div>
  );
};

export default HashTagBox;
