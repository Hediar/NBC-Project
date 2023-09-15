'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import { Button, Input, Popconfirm, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

interface Props {
  user: User;
}

const ChangeEmail = ({ user }: Props) => {
  const appMetadata = user.app_metadata;

  const userPrevEmail = user.email as string;

  const [emailValue, setEmailValue] = useState<string>(userPrevEmail);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  if (appMetadata.provider !== 'email') {
    return (
      <>
        <div className="w-full items-center sm:items-start flex flex-col gap-6">
          <h1 className="sm:text-start text-center w-full sm:px-4 font-bold">이메일 변경</h1>
          <p className="w-full px-4 text-neutral-800 text-sm sm:text-base">
            소셜계정으로 로그인하신 회원님은 이메일을 변경할 수 없습니다.
          </p>
        </div>
      </>
    );
  }

  const editHandler = async () => {
    if (userPrevEmail === emailValue) {
      messageApi.open({
        type: 'warning',
        content: '예전과 동일한 이메일 주소입니다.'
      });
      return;
    } else {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase.auth.updateUser({ email: emailValue });
      if (error) {
        if (error.message.includes('address has already')) {
          return messageApi.open({
            type: 'warning',
            content: '이미 등록된 계정입니다. 다른 이메일을 사용해주세요.'
          });
        } else if (error.message.includes('every 60 seconds')) {
          messageApi.open({
            type: 'error',
            content: '보안 이유로 1분 후 다시 시도해주세요.'
          });
        }
        router.refresh();
        return messageApi.open({
          type: 'error',
          content: '에러가 발생했습니다. 다시 시도해주세요.'
        });
      }
      if (data) {
        messageApi.open({
          type: 'success',
          content: '새로 등록한 메일주소의 수신함을 확인해주세요.'
        });
      }
      setIsDisabled(true);
      router.refresh();
    }
  };

  return (
    <>
      {contextHolder}
      <div className="w-full items-center sm:items-start flex flex-col gap-6 ">
        <h1 className="sm:text-start text-center font-bold w-full px-4">이메일 변경</h1>
        <Input
          placeholder="이메일 주소"
          type="email"
          className="py-2.5 max-w-[350px]"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          disabled={isDisabled}
        />
        <div className="w-full flex flex-col items-center max-w-[350px]">
          {isDisabled && (
            <Popconfirm
              title="이메일 변경"
              description="정말 수정하시겠습니까?"
              onConfirm={() => setIsDisabled(false)}
              okText="확인"
              okType="default"
              cancelText="취소"
            >
              <Button type="primary" className="w-full max-w-[350px] sm:w-full button-dark py-2 h-full">
                수정하기
              </Button>
            </Popconfirm>
          )}
          {!isDisabled && (
            <Popconfirm
              title="이메일 변경"
              description="정말 변경하시겠습니까?"
              onConfirm={editHandler}
              okText="확인"
              okType="default"
              cancelText="취소"
            >
              <Button type="primary" className="w-full max-w-[350px] sm:w-full button-dark py-2 h-full">
                변경하기
              </Button>
            </Popconfirm>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangeEmail;
