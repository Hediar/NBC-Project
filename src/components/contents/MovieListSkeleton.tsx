import React from 'react';

const MovieListSkeleton = () => {
  const dataList = new Array(20).fill(null);
  return (
    <div className="flex flex-wrap mx-5 p-3 gap-4 items-start justify-center sm:grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 2xl:mx-36">
      {dataList.map((data, idx) => (
        <div className="gap-4 mb-2" key={idx}>
          <div className="w-[140px] sm:w-[240px] flex flex-col gap-3">
            <div className="relative">
              <div className="animate-pulse bg-GreyScaleGrey w-[140px] h-[210px] sm:w-[240px] sm:h-[360px] rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieListSkeleton;
