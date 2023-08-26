import React from 'react';

type Props = {
  tagList: string[] | [];
  setTagList: React.Dispatch<React.SetStateAction<string[] | []>>;
};

const HashTagBox = ({ tagList, setTagList }: Props) => {
  // onChange로 관리할 문자열
  const [tagItem, setTagItem] = React.useState<string | ''>('');

  const onKeyUp = (e: any) => {
    e.preventDefault();
    // key(keyCode): Enter(13) spacebar(32) 쉼표(188)
    const isSubmitKey = e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 188;
    if (isSubmitKey && e.target.value.length !== 0) {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    const newTagItem = tagItem.trim().replaceAll(',', '');
    setTagList((prev) => [...prev, newTagItem]);
    setTagItem('');
  };

  const deleteTagItem = (targetIndex: number) => {
    const filteredTagList = tagList.filter((_, i) => i !== targetIndex);
    setTagList(filteredTagList);
  };

  return (
    <div>
      <ul>
        {tagList.map((tag, i) => (
          <li key={tag + i} onClick={() => deleteTagItem(i)}>
            {tag}
          </li>
        ))}
      </ul>
      <input
        className="HashInput"
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
