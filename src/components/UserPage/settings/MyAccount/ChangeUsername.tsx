import useUserInfoStore from '@/store/saveCurrentUserData';
import { Button, Input, Popconfirm, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

interface Props {
  userData: Database['public']['Tables']['users']['Row'];
}

const ChangeUsername = ({ userData }: Props) => {
  const username = userData.username!;
  const userId = userData.id!;
  const [usernameValue, setusernameValue] = useState<string>('');
  const { userInfo, saveUserInfo } = useUserInfoStore();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const onConfirmHandler = async () => {
    if (usernameValue.length < 2 || usernameValue.length > 15) {
      return messageApi.open({
        type: 'error',
        content: '닉네임의 길이는 최소 2글자, 최대 15글자 입니다.'
      });
    } else if (!/^[a-zA-Z가-힣\s0-9]+$/.test(usernameValue)) {
      return messageApi.open({
        type: 'error',
        content: '닉네임은 한글과 알파벳, 숫자 그리고 띄어쓰기가 가능합니다. 특수문자는 허용되지 않습니다.',
        duration: 2
      });
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
      router.refresh();

      messageApi.open({
        type: 'success',
        content: '성공적으로 변경되었습니다.'
      });
      router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/user-page/${usernameValue}/settings?my-account=true`);
    }
  };

  return (
    <>
      {contextHolder}
      <div className=" w-[90%] flex flex-col sm:flex-row gap-2 sm:gap-4">
        <p className="text-center sm:text-start text-neutral-800 text-xl font-bold leading-normal">{username}</p>
        <Popconfirm
          title="수정할 닉네임을 적어주세요."
          description={
            <>
              <p className="text-center mb-1">
                2글자 이상 15글자 이하인 닉네임이 가능하며,
                <br /> 특수문자는 허용되지 않습니다.
              </p>
              <Input
                placeholder="새로운 닉네임"
                value={usernameValue}
                onChange={(e) => setusernameValue(e.target.value)}
              />
            </>
          }
          onConfirm={onConfirmHandler}
          okText="확인"
          okType="default"
          cancelText="취소"
        >
          <Button
            type="primary"
            className=" h-[30px] px-3 py-1 bg-zinc-600 rounded-lg border border-zinc-600 gap-1.5 cursor-pointer text-white text-[14px] "
          >
            수정
          </Button>
        </Popconfirm>
      </div>
    </>
  );
};

export default ChangeUsername;
