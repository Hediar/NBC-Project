import React from 'react';

const UserPageTabs = () => {
  return (
    <div className="mt-5 w-full flex gap-3 justify-center relative">
      <div className="w-8/12 flex gap-7">
        <div className="border-b-2 border-slate-600 pb-2 z-10 cursor-pointer hover:border-b-2 hover:border-slate-500 transform ease-in duration-200">
          내 정보
        </div>
        <div className=" pb-2 z-10 cursor-pointer hover:border-b-2 hover:border-slate-500 transform ease-in duration-200">
          추천 목록
        </div>
        <div className=" pb-2 z-10 cursor-pointer hover:border-b-2 hover:border-slate-500 transform ease-in duration-200">
          찜 목록
        </div>
        <div className=" pb-2 z-10 cursor-pointer hover:border-b-2 hover:border-slate-500 transform ease-in duration-200">
          좋아요 목록
        </div>
        <div className=" pb-2 z-10 cursor-pointer hover:border-b-2 hover:border-slate-500 transform ease-in duration-200">
          내가 작성한 리뷰
        </div>
      </div>
      <div className="absolute bottom-0 border-b-2 border-slate-200 w-full"></div>
    </div>
  );
};

export default UserPageTabs;
