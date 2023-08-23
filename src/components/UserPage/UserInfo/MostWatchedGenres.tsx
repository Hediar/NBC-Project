import React from 'react';
interface Props {
  params: string;
}
const UserPageMostWatchedGenres = ({ params: username }: Props) => {
  return (
    <div className="w-full h-60  flex  flex-col gap-4 justify-center items-center relative">
      <h2 className="text-2xl">{username}님이 가장 좋아하는 장르는</h2>
      <div className="flex gap-2">
        <div className="bg-gray-300 text-xl rounded-xl p-2">#액션</div>
        <div className="bg-gray-300 text-xl rounded-xl p-2">#판타지</div>
        <div className="bg-gray-300 text-xl rounded-xl p-2">#드라마</div>
      </div>

      <div className="absolute bottom-0 border-b-2 border-slate-200 w-full"></div>
    </div>
  );
};

export default UserPageMostWatchedGenres;
