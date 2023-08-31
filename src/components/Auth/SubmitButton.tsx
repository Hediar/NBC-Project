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
      {showPasswordFormatError && <span className="text-center text-sm text-red-400">{passwordError}</span>}
      <input
        onClick={clickHandler}
        type="submit"
        value={!isClicked ? inputValue : loadingMessage}
        className="custom_button"
        disabled={shouldDisable}
      />
      {isClicked && <LoadingSpinner />}
    </>
  );
};

export default SubmitButton;
