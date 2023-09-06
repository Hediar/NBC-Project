/* eslint-disable @next/next/no-img-element */
'use client';

import OverlaidModal from '@/components/common/OverlaidModal';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { message } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface Props {
  userData: Database['public']['Tables']['users']['Row'];
}

const AvatarPhoto = ({ userData }: Props) => {
  const avatarUrl = userData.avatar_url!;
  const userId = userData.id!;
  const username = userData.username!;

  const [photoURLValue, setPhotoURLValue] = useState<string>(avatarUrl);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<any>(null);
  const { userInfo, saveUserInfo } = useUserInfoStore();
  const router = useRouter();
  const [isUploadModal, setIsUploadModal] = useState<boolean>(false);
  const queryString = !!useSearchParams().get('upload-photo');

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (avatarUrl) {
      setPhotoURLValue(avatarUrl);
    }
  }, [avatarUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setPhoto(file);
    // 파일을 선택하고, 업로드하기 전에 파일을 다시 선택하려고 선택 창을 띄운다음에 취소 버튼을 누르면, 기존에 있는 사진은 취소 되고, 원래 사진으로 돌린다.
    if (!file) {
      setPhotoURLValue(avatarUrl);
      setIsDisabled(true);
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
      reader.readAsDataURL(file);
      setIsDisabled(false);
      return;
    }
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', photo!);

    const data = await fetch('/auth/profile', { method: 'post', body: formData });

    const { data: fetchData, isError, isSuccess } = await data.json();

    if (isSuccess) {
      saveUserInfo({ ...userInfo, avatar_url: fetchData });
      setPhoto(null);
      setIsDisabled(true);
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
      <div className="flex gap-8 w-full">
        <div className="flex gap-4 items-center">
          <img
            className="w-16 h-16 rounded-full"
            src={photoURLValue}
            alt="avatar"
            onClick={() => router.push('?my-account=true&upload-photo=true')}
          />
          <h1 className="text-lg">{username}</h1>
        </div>
      </div>

      {queryString && (
        <OverlaidModal>
          <div>
            <input
              ref={fileInputRef}
              className="text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
      "
              type="file"
              name="avatar"
              onChange={(e) => handleFileChange(e)}
            />
            <button
              className="py-1 px-4 shadow-sm shadow-slate-500 rounded-md text-sm bg-slate-800 text-white disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none"
              disabled={isDisabled}
              onClick={handleClick}
            >
              업로드
            </button>
          </div>
        </OverlaidModal>
      )}
    </>
  );
};

export default AvatarPhoto;
