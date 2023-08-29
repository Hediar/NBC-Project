'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface Props {
  userId: string;
}

const UpdateUsername = ({ userId }: Props) => {
  const { userInfo, saveUserInfo } = useUserInfoStore();
  const [usernameValue, setUsernameValue] = useState<string>(userInfo.username!);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    setUsernameValue(userInfo.username!);
  }, [userInfo]);

  const clickHandler = async () => {
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
          alert('이미 등록된 닉네임입니다. 다른 닉네임을 사용해주세요.');
          return;
        }
        alert('에러가 발생했습니다. 다시 시도해주세요.');
        return;
      }

      saveUserInfo({ ...userInfo, username: usernameValue });
      alert('성공적으로 변경되었습니다.');
      router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/user-page/${usernameValue}/settings`);
    }
  };
  return (
    <div className="mt-8">
      <h2>유저이름</h2>
      <input
        type="text"
        value={usernameValue}
        onChange={(e) => setUsernameValue(e.target.value)}
        disabled={isDisabled}
        ref={usernameInputRef}
      />
      <button ref={buttonRef} onClick={clickHandler}>
        수정
      </button>
    </div>
  );
};

export default UpdateUsername;
