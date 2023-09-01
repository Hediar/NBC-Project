import React from 'react';

const DrawSvgX = ({ size }: { size: number }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 100 100">
      <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="5" />
      <line x1="90" y1="10" x2="10" y2="90" stroke="black" stroke-width="5" />
    </svg>
  );
};

export default DrawSvgX;
