'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import { Popconfirm, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

interface Props {
  user: User;
}

const ChangeEmail = ({ user }: Props) => {
  const userPrevEmail = user.email as string;
  const appMetadata = user.app_metadata;

  const [emailValue, setEmailValue] = useState<string>(userPrevEmail);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  if (appMetadata.provider !== 'email') {
    return (
      <>
        소셜 로그인을 이용중입니다. <br />
        소셜 로그인 사용자는 이메일을 변경할 수 없습니다.
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
      <div className="w-full items-center sm:items-start flex flex-col gap-6">
        <h1 className="w-full px-4">이메일 변경</h1>
        <input
          placeholder="이메일 주소"
          type="email"
          className="custom_input"
          style={{ width: '350px' }}
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          disabled={isDisabled}
        />
        <div>
          {isDisabled && (
            <Popconfirm
              title="이메일 변경"
              description="정말 수정하시겠습니까?"
              onConfirm={() => setIsDisabled(false)}
              okText="확인"
              okType="default"
              cancelText="취소"
            >
              <div className="w-[350px] sm:w-auto">
                <button className="w-full button-dark">수정하기</button>
              </div>
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
              <div className="w-[350px] sm:w-auto">
                <button className="w-full button-dark">변경하기</button>
              </div>
            </Popconfirm>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangeEmail;
