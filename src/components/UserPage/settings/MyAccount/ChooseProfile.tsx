import Icon1 from '@/styles/svg/avatar/Icon1';
import Icon2 from '@/styles/svg/avatar/Icon2';
import Icon3 from '@/styles/svg/avatar/Icon3';
import Icon4 from '@/styles/svg/avatar/Icon4';
import Icon5 from '@/styles/svg/avatar/Icon5';
import { Button } from 'antd';
import React from 'react';
import IconContainer from './IconContainer';

const avatar_url = {
  avatar1: 'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-1.png',
  avatar2:
    'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-2.png?t=2023-09-11T06%3A40%3A10.903Z',
  avatar3: 'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-3.png',
  avatar4:
    'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-4.png?t=2023-09-11T06%3A40%3A25.813Z',
  avatar5:
    'https://aiwjpebjrijveiqokhsn.supabase.co/storage/v1/object/public/users/avatar/default/avatar-5.png?t=2023-09-11T06%3A40%3A33.998Z'
};

const ChooseProfile = () => {
  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <h2 className="sm:text-base lg:text-lg font-medium">기본 프로필을 선택하세요.</h2>
      <div className="w-[90%] flex gap-2 items-center justify-center">
        <IconContainer>
          <Icon1 />
        </IconContainer>
        <IconContainer>
          <Icon2 />
        </IconContainer>
        <IconContainer>
          <Icon3 />
        </IconContainer>
        <IconContainer>
          <Icon4 />
        </IconContainer>
        <IconContainer>
          <Icon5 />
        </IconContainer>
      </div>
      <Button type="primary" className="w-[50%] h-full p-2 bg-gray-600 mb-5  disabled:hover:bg-slate-50">
        선택완료
      </Button>
    </div>
  );
};

export default ChooseProfile;
