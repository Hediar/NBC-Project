'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import EditPhoto from '@/styles/svg/Edit';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ChangeUsername from './ChangeUsername';

interface Props {
  userData: Database['public']['Tables']['users']['Row'];
}

const ChangeAvatarPhoto = ({ userData }: Props) => {
  const avatarUrl = userData.avatar_url!;
  const userId = userData.id!;

  const [photoURLValue, setPhotoURLValue] = useState<string>(avatarUrl);
  const fileInputRef = useRef<any>(null);

  const { userInfo, saveUserInfo } = useUserInfoStore();

  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (avatarUrl) {
      setPhotoURLValue(avatarUrl);
    }
  }, [avatarUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    // 파일을 선택하고, 업로드하기 전에 파일을 다시 선택하려고 선택 창을 띄운다음에 취소 버튼을 누르면, 기존에 있는 사진은 취소 되고, 원래 사진으로 돌린다.
    if (!file) {
      setPhotoURLValue(avatarUrl);
      return;
    }
    // 선택한 파일을 새로운 프로필에 보여주기
    const reader = new FileReader();
    reader.onload = () => {
      const uploadedPhotoURL = reader.result as string;
      setPhotoURLValue(uploadedPhotoURL);
    };

    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      messageApi.open({
        type: 'info',
        content: '이미지 파일만 업로드할 수 있습니다.'
      });
      fileInputRef.current.value = null;
      return;
    }

    if (file) {
      await onChangeHandler(file);
      reader.readAsDataURL(file);
      return;
    }
  };

  const onChangeHandler = async (file: File) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', file!);

    const data = await fetch('/auth/profile', { method: 'post', body: formData });

    const { data: fetchData, isError, isSuccess } = await data.json();

    if (isSuccess) {
      saveUserInfo({ ...userInfo, avatar_url: fetchData });
      fileInputRef.current.value = null;
      router.refresh();
      messageApi.open({
        type: 'success',
        content: '업데이트 완료되었습니다.'
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="h-40 w-10/12 md:h-20 rounded-xl bg-white border border-[#888] shadow-sm shadow-gray-400">
        <div className="h-full px-8 flex gap-4 items-center">
          <div className="relative w-10 h-10 overflow-visible">
            <img
              className="w-full h-full rounded-full"
              src={photoURLValue}
              alt="avatar"
              onClick={() => router.push('?my-account=true&upload-photo=true')}
            />
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              name="avatar"
              onChange={(e) => handleFileChange(e)}
            />
            <EditPhoto
              className="p-[5px] bg-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
              onClick={() => {
                fileInputRef.current.click();
              }}
              width={25}
              height={25}
            />
          </div>
          <ChangeUsername userData={userData} />
        </div>
      </div>
    </>
  );
};

export default ChangeAvatarPhoto;
