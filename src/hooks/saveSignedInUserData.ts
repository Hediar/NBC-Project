'use client';

import { useEffect } from 'react';
import useUserInfoStore from '@/store/saveCurrentUserData';
import axios from 'axios';

const useSaveSignedInUserData = () => {
  const { statusChanged, userInfo, saveUserInfo } = useUserInfoStore();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const {
          data: { userData }
        } = await axios('/auth/get-userdata');
        if (!userData) {
          return;
        } else {
          saveUserInfo(userData);
        }
      } catch (error) {
        return;
      }
    };
    getUserData();
  }, [saveUserInfo, statusChanged]);

  return userInfo;
};

export default useSaveSignedInUserData;
