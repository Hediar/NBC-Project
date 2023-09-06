import React from 'react';
import AvatarPhoto from './AvatarPhoto';
import Miscellaneous from './Miscellaneous';
import { User } from '@supabase/supabase-js';

interface Props {
  user: User;
  userData: Database['public']['Tables']['users']['Row'];
}

const MyAccount = ({ user, userData }: Props) => {
  return (
    <div className="w-10/12 bg-white shadow-md shadow-gray-300 p-8">
      <div className="flex flex-col gap-4 justify-between w-full">
        <AvatarPhoto userData={userData} />
        <Miscellaneous user={user} />
      </div>
    </div>
  );
};

export default MyAccount;

// 이메일, 가입일, 마지막 접속 시간
