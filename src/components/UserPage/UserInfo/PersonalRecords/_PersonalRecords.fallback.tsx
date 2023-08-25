import React from 'react';

const Fallback = () => {
  return (
    <div className="w-full h-64  flex justify-center items-center relative">
      <div className="flex gap-4 w-8/12">
        <div className="flex flex-col justify-center items-center gap-3 bg-gray-300 w-1/3 h-40 rounded-2xl"></div>
        <div className="flex flex-col justify-center items-center gap-3 bg-gray-300 w-1/3 h-40 rounded-2xl"></div>
        <div className="flex flex-col justify-center items-center gap-3 bg-gray-300 w-1/3 h-40 rounded-2xl"></div>
      </div>
      <div className="absolute bottom-0 border-b-2 border-slate-200 w-full"></div>
    </div>
  );
};

export default Fallback;
