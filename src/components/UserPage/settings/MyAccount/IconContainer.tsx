'use client';

import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';

const IconContainer = ({ url, children }: { url: string; children: ReactNode }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const onClickHandler = async () => {
    setIsSelected(true);
  };

  return (
    <div
      onClick={onClickHandler}
      className={`animate-300 hover:scale-105 cursor-pointer bg-white p-1 shadow-md shadow-gray-200 rounded-full ${
        isSelected && 'border-1 border-gray-400'
      } `}
    >
      {children}
    </div>
  );
};

export default IconContainer;

// const {
//   data: { url1 }
// } = await axios.post('/auth/profile/change-avatar', JSON.stringify({ url }));
