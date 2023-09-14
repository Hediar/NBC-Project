'use client';

import React, { useEffect } from 'react';

type Props = {
  fieldArray?: any;
  defaultValue: any[];
};

const HashTagBox = ({ fieldArray, defaultValue }: Props) => {
  const { fields, append, remove, replace } = fieldArray;

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
    newTagItem && append({ value: newTagItem });

    setTagItem('');
  };

  const deleteTagItem = (targetIndex: number) => {
    remove(targetIndex);
  };

  useEffect(() => {
    replace(defaultValue || []);
  }, [defaultValue]);

  return (
    <div className="custom_input !flex">
      <ul className="flex flex-wrap">
        {fields.map(({ value }: { value: string }, i: number) => (
          <li
            key={value + i}
            onClick={() => deleteTagItem(i)}
            className="m-1 rounded-full  text-cyan-700 bg-cyan-100 border border-cyan-300 py-1 px-2 text-xs font-medium cursor-pointer"
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
        placeholder="쉼표 혹은 스페이스바를 입력하여 태그를 등록 할 수 있습니다. 등록된 태그를 클릭하면 삭제됩니다."
      />
    </div>
  );
};

export default HashTagBox;
