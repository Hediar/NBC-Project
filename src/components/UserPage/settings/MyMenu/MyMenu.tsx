import React from 'react';
import { cookies } from 'next/headers';
import ToggleWatchLater from './ToggleWatchLater';
import axios from 'axios';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const MyMenu = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const userId = user!.id;

  const getWatchLaterIsPublicData = async () => {
    const {
      data: { data, error }
    } = await axios.post(`${process.env.BASE_URL}/auth/profile/set-boundary/watch-later`, { userId });
    return data.isPublic;
  };
  const isWatchLaterListPublic: boolean = await getWatchLaterIsPublicData();

  return (
    <div className="p-10">
      <div className="w-full sm:w-10/12 bg-white border border-[#888] shadow-sm shadow-gray-400 px-8 py-10 rounded-2xl">
        <h1>기능 업데이트 중 입니다.</h1>
        <h1 className="text-neutral-800 font-bold mb-4 text-lg">나의 목록 공개</h1>
        <div className="flex flex-col gap-4">
          <ToggleWatchLater isPublic={isWatchLaterListPublic} />

          {/* <div className="w-64 h-12 px-3 py-2 bg-neutral-50 rounded-xl border border-gray-200 justify-between items-center gap-5 inline-flex">
            <p className="text-neutral-800 text-sm">좋아요 목록</p>
            <Switch defaultChecked onChange={onChange} />
          </div>
          <div className="w-64 h-12 px-3 py-2 bg-neutral-50 rounded-xl border border-gray-200 justify-between items-center gap-5 inline-flex">
            <p className="text-neutral-800 text-sm">나의 리뷰</p>
            <Switch defaultChecked onChange={onChange} />
          </div>
          <div className="w-64 h-12 px-3 py-2 bg-neutral-50 rounded-xl border border-gray-200 justify-between items-center gap-5 inline-flex">
            <p className="text-neutral-800 text-sm">나의 토론</p>
            <Switch defaultChecked onChange={onChange} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyMenu;
