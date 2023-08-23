'use client';
import React, { useState } from 'react';

interface Props {
  inputValue: string;
  loadingMessage: string;
  shouldDisable?: boolean;
}

const SubmitButton = ({ inputValue, loadingMessage, shouldDisable = false }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const clickHandler = () => {
    setIsClicked(!isClicked);
  };

  const Spinner = () => {
    return (
      <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]">
        <div className="animate-spin border-t-[2px] border-l-[3px] border-slate-500 w-8 h-8 rounded-full "></div>
      </div>
    );
  };

  return (
    <>
      <input
        onClick={clickHandler}
        type="submit"
        value={!isClicked ? inputValue : loadingMessage}
        className="border border-slate-900 p-2 cursor-pointer w-full rounded-md disabled:bg-slate-100 mt-5"
        disabled={shouldDisable}
      />
      {isClicked && <Spinner />}
    </>
  );
};

export default SubmitButton;
