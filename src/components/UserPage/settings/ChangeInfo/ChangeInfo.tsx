import { User } from '@supabase/supabase-js';
import React from 'react';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

interface Props {
  user: User;
}

const ChangeInfo = ({ user }: Props) => {
  return (
    <div className="p-10">
      <div className="w-full sm:w-10/12 bg-white border border-[#888] shadow-sm shadow-gray-400 px-8 py-10 rounded-2xl">
        <ChangeEmail user={user} />
        <div className="mb-12"></div>
        <ChangePassword user={user} />
      </div>
    </div>
  );
};

export default ChangeInfo;
