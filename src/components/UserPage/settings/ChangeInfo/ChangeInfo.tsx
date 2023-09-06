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
      <div>
        <ChangeEmail user={user} />
        <div className="mb-12"></div>
        <ChangePassword user={user} />
      </div>
    </div>
  );
};

export default ChangeInfo;
