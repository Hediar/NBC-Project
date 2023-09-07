import useUserInfoStore from '@/store/saveCurrentUserData';
import { Input, Popconfirm, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

interface Props {
  userData: Database['public']['Tables']['users']['Row'];
}

const ChangeUsername = ({ userData }: Props) => {
  const username = userData.username!;
  const userId = userData.id!;

  const [usernameInputValue, setUsernameInputValue] = useState<string>('');

  const { userInfo, saveUserInfo } = useUserInfoStore();
  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    // 특수문자와 스페이스바를 제외한다
    const sanitizedValue = newUsername.replace(/[^\w\dㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
    setUsernameInputValue(sanitizedValue);
  };

  const usernameChangeHandler = async () => {
    const formData = new FormData();
    formData.append('username', usernameInputValue);
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

    saveUserInfo({ ...userInfo, username: usernameInputValue });
    router.refresh();

    messageApi.open({
      type: 'success',
      content: '성공적으로 변경되었습니다.'
    });
    router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/user-page/${usernameInputValue}/settings?my-account=true`);
  };
  return (
    <div className="flex gap-4">
      <p className="text-neutral-800 text-xl font-bold leading-normal">{username}</p>
      <Popconfirm
        title="수정할 닉네임을 적어주세요."
        description={
          <Input
            placeholder="새로운 닉네임"
            value={usernameInputValue}
            onChange={(e) => inputOnChange(e)}
            pattern="/[^\w\dㄱ-ㅎㅏ-ㅣ가-힣\s]/"
            maxLength={15}
          />
        }
        onConfirm={usernameChangeHandler}
        okText="확인"
        okType="default"
        cancelText="취소"
      >
        <button className=" h-[30px] px-3 py-1 bg-zinc-600 rounded-lg border border-zinc-600 gap-1.5 cursor-pointer text-white text-[14px] ">
          수정
        </button>
      </Popconfirm>
    </div>
  );
};

export default ChangeUsername;
