import React from 'react';

const UserPagePersonalRecords = () => {
  return (
    <div className="w-full h-64  flex justify-center items-center relative">
      <div className="flex gap-4 w-8/12">
        <div className="flex flex-col justify-center items-center gap-3 bg-gray-300 w-1/3 h-40 rounded-2xl">
          <p className="text-xl">내가 남긴 리뷰수</p>
          <p className="text-lg text-gray-700">50개</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 bg-gray-300 w-1/3 h-40 rounded-2xl">
          <p className="text-xl">현재까지 본 영화 시간</p>
          <p className="text-lg text-gray-700">25h 23m</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 bg-gray-300 w-1/3 h-40 rounded-2xl">
          <p className="text-xl">내가 지금까지 본 영화</p>
          <p className="text-lg text-gray-700">23개</p>
        </div>
      </div>
      <div className="absolute bottom-0 border-b-2 border-slate-200 w-full"></div>
    </div>
  );
};

export default UserPagePersonalRecords;
