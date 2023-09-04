'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { useEffect } from 'react';

interface Props {
  userData: Database['public']['Tables']['users']['Row'];
}

const SaveUserInfoToStore = ({ userData }: Props) => {
  const { saveUserInfo } = useUserInfoStore();

  useEffect(() => {
    saveUserInfo(userData);
  }, [userData, saveUserInfo]);

  return <></>;
};

export default SaveUserInfoToStore;
