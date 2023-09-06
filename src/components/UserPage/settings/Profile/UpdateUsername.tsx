'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';

interface Props {
  userData: Database['public']['Tables']['users']['Row'];
}

const UpdateUsername = ({ userData }: Props) => {
  const username = userData.username!;
  const userId = userData.id!;

  const { userInfo, saveUserInfo } = useUserInfoStore();
  const [usernameValue, setUsernameValue] = useState<string>(username);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [formatError, setFormatError] = useState<string | null>('');
  const [showFormatError, setShowFormatError] = useState<boolean>(false);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    // 특수문자와 스페이스바를 제외한다
    const sanitizedValue = newUsername.replace(/[^\w\dㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
    setUsernameValue(sanitizedValue);
  };

  const clickHandler = async () => {
    if (formatError) {
      setShowFormatError(true);
      return;
    } else {
      setShowFormatError(false);
    }

    if (buttonRef.current!.innerText === '수정') {
      if (confirm('정말 변경하시겠습니까?')) {
        buttonRef.current!.innerText = '확인';
        setIsDisabled(false);
      }
    } else {
      const formData = new FormData();
      formData.append('username', usernameValue);
      formData.append('id', userId);

      const {
        data: { isError, isSuccess, error, newUsername: usernameData }
      } = await axios.post('/auth/profile/username', formData);

      if (isError) {
        if (error.includes('이미 등록된')) {
          messageApi.open({
            type: 'error',
            content: '이미 등록된 닉네임입니다. 다른 닉네임을 사용해주세요.'
          });
          return;
        }
        messageApi.open({
          type: 'error',
          content: '에러가 발생했습니다. 다시 시도해주세요.'
        });
        return;
      }

      saveUserInfo({ ...userInfo, username: usernameValue });
      messageApi.open({
        type: 'success',
        content: '성공적으로 변경되었습니다.'
      });
      router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/user-page/${usernameValue}/settings`);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="mt-8">
        {showFormatError && <p>{formatError}</p>}
        <div className="flex  gap-6">
          <div>
            <h2>닉네임</h2>
            <div className="flex gap-4">
              <input
                className="py-1 px-3 shadow-sm shadow-gray-400"
                type="text"
                value={usernameValue}
                onChange={inputOnChange}
                disabled={isDisabled}
                ref={usernameInputRef}
                maxLength={15}
              />
              <button className="py-1 px-3 shadow-sm shadow-gray-400" ref={buttonRef} onClick={clickHandler}>
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUsername;
