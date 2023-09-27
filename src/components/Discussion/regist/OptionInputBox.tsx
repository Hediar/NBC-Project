import { optionMark } from '@/static/optionMark';
import React from 'react';

type Props = {
  idx: number;
  option: Option;
  deleteOption: (idx: number) => void;
  changeOption: (idx: number, newText: string) => void;
};

const OptionInputBox = ({ idx, option, deleteOption, changeOption }: Props) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeOption(idx, e.target.value);
  };
  return (
    <div className="flex gap-2 items-center">
      <div className="w-full">
        <div>
          {idx <= 1 ? (
            <label htmlFor={`의견${optionMark[idx]}`}>의견{optionMark[idx]}*</label>
          ) : (
            <label htmlFor={`의견${optionMark[idx]}`}>의견{optionMark[idx]}</label>
          )}
          {idx > 1 && <button className="rounded-full p-1 ml-1 bg-gray-200" onClick={() => deleteOption(idx)}></button>}
        </div>

        <input
          name={`의견${optionMark[idx]}`}
          className="border w-full px-3 py-1.5 my-2 rounded-[10px]"
          type="text"
          placeholder="내용을 입력해주세요"
          value={option.text}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
};

export default OptionInputBox;
