'use client';

import { useEffect, useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

interface Props {
  inputValue: string;
  loadingMessage: string;
  shouldDisable?: boolean;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  passwordError?: string | null;
}

const SubmitButton = ({ inputValue, loadingMessage, shouldDisable, isError, setIsError, passwordError }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [showPasswordFormatError, setShowPasswordFormatError] = useState<boolean>(false);

  const clickHandler = () => {
    if (passwordError) {
      setShowPasswordFormatError(true);
      return;
    } else {
      setShowPasswordFormatError(false);
    }
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    if (isError) {
      setIsClicked(false);
      setIsError(false);
    }
  }, [isError, setIsError]);

  return (
    <>
      {showPasswordFormatError && <span className="text-sm text-red-400">{passwordError}</span>}
      <input
        onClick={clickHandler}
        type="submit"
        value={!isClicked ? inputValue : loadingMessage}
        className="border border-slate-900 p-2 cursor-pointer w-full rounded-md disabled:bg-slate-200 mt-5"
        disabled={shouldDisable}
      />
      {isClicked && <LoadingSpinner />}
    </>
  );
};

export default SubmitButton;
