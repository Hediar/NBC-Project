'use client';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { Upload, UploadFile, UploadProps, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  userData: Database['public']['Tables']['users']['Row'];
}

const MyAccount = ({ userData }: Props) => {
  const avatarUrl = userData.avatar_url!;
  const userId = userData.id!;
  const username = userData.username!;

  const [photoURLValue, setPhotoURLValue] = useState<string>(avatarUrl);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<any>(null);
  const { userInfo, saveUserInfo } = useUserInfoStore();
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  const onChangeHandler = async () => {
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

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <>
      {contextHolder}
      <div className="w-full flex flex-col gap-4 p-10">
        <div className="w-10/12 h-20 rounded-xl bg-gray-400">
          <div className="h-full px-8 flex gap-4 items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <img
                className="w-full h-full"
                src={photoURLValue}
                alt="avatar"
                onClick={() => router.push('?my-account=true&upload-photo=true')}
              />
              <div>
                <input
                  ref={fileInputRef}
                  className="w-16 absolute bottom-1 bg-gray-800 bg-opacity-30 text-center text-white file:opacity-0"
                  type="file"
                  name="avatar"
                  onChange={(e) => handleFileChange(e)}
                />
                <span className="absolute bottom-1 left-1/2 right-1/2 text-white text-xs w-5">편집</span>
              </div>
            </div>

            <div className="flex gap-4">
              <div>{username}</div>
              <div>button</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-10/12 bg-gray-300 p-8 h-96 rounded-2xl">
          <div className="">
            <h2>이메일</h2>
            <p>sample@example.com</p>
            <div>
              <button type="button">
                <i></i> Upload File
                <input type="file" />
              </button>
            </div>
          </div>
          <div>
            <h2>가입일</h2>
            <p>2023.08.01</p>
          </div>
          <div>
            <h2>마지막 접속 시간</h2>
            <p>2023.08.01 19:20</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
