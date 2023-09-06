import React from 'react';
import ChangeAvatarPhoto from './ChangeAvatarPhoto';
import changeFormat from '@/api/formatTime';
import { User } from '@supabase/supabase-js';

interface Props {
  userData: Database['public']['Tables']['users']['Row'];
  user: User;
}

const MyAccount = async ({ userData, user }: Props) => {
  const createdAt = changeFormat(user.created_at);
  const lastConnected = changeFormat(user.last_sign_in_at!);

  return (
    <div className="w-full items-center lg:items-start flex flex-col gap-4 p-10">
      <ChangeAvatarPhoto userData={userData} />
      <div className="flex flex-col gap-7 w-10/12 bg-white border border-[#888] shadow-sm shadow-gray-400 p-8 h-96 rounded-2xl">
        <div className="flex flex-col gap-2">
          <div className="flex gap-[10px] items-center">
            <h2 className="font-bold text-sm">로그인 수단</h2>
            <div className="w-px h-3 bg-neutral-400" />
            <h2 className="font-bold">이메일</h2>
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="text-[14px] ">{user.app_metadata.provider}</span>
            <div className="w-px h-3 bg-neutral-400" />
            <span className="text-[14px] ">{userData.email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">가입일</h2>
          <p className="text-[14px] ">{createdAt}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">마지막 접속 시간</h2>
          <p className="text-[14px] ">{lastConnected}</p>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
