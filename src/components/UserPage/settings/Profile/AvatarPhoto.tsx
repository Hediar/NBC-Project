'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  avatarUrl: string;
  userId: string;
  username: string;
}

const AvatarPhoto = ({ avatarUrl, userId, username }: Props) => {
  const [photoURLValue, setPhotoURLValue] = useState<string>(avatarUrl);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<any>(null);
  const { userInfo, saveUserInfo } = useUserInfoStore();

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
      alert('이미지 파일만 업로드할 수 있습니다.');
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
      alert('업데이트 완료되었습니다.');
    }
  };

  return (
    <div className="flex gap-8">
      <div>
        <Image className="w-24 h-24 rounded-full" width={200} height={200} src={photoURLValue} alt="avatar" />
      </div>
      <div>
        <div>
          <h1 className="text-lg">{username}</h1>
          <p className="text-sm text-gray-600">128x128 사이즈를 추천합니다.</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 justify-start items-start">
          <input
            ref={fileInputRef}
            className="text-xs"
            type="file"
            name="avatar"
            onChange={(e) => handleFileChange(e)}
          />
          <button
            className="py-1 px-4 shadow-sm shadow-slate-500 rounded-md text-sm bg-slate-800 text-white disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none"
            disabled={isDisabled}
            onClick={handleClick}
          >
            Upload new
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPhoto;
