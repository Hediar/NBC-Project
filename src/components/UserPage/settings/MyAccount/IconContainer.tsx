'use client';

import useIsProfileSelected from '@/store/isProfileSelected';
import { ReactNode } from 'react';

interface Props {
  targetId: number;
  children: ReactNode;
}

const IconContainer = ({ targetId, children }: Props) => {
  const { target, isSelected, setIsProfileSelected } = useIsProfileSelected();

  const onClickHandler = async () => {
    if (target !== targetId) {
      setIsProfileSelected(targetId, true);
    } else if (target === targetId) {
      setIsProfileSelected(null, false);
    }
  };

  return (
    <div
      onClick={onClickHandler}
      className={`animate-200 hover:scale-105 cursor-pointer bg-white p-1 shadow-md shadow-gray-200 rounded-full border-[1.5px]   ${
        isSelected && target === targetId ? 'border-gray-400' : 'border-transparent'
      } `}
    >
      {children}
    </div>
  );
};

export default IconContainer;
