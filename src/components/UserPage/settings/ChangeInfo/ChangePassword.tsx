'use client';

import { User } from '@supabase/supabase-js';
import React, { useRef, useState } from 'react';
import { Button, Input, Popconfirm, message } from 'antd';
import axios from 'axios';

interface Props {
  user: User;
}

const ChangePassword = ({ user }: Props) => {
  const appMetadata = user.app_metadata;

  const [nonceValue, setNonceValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [hasEmailSent, setHasEmailSent] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const outerDivRef = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [disableInput, setDisableInputs] = useState<boolean>(false);

  if (appMetadata.provider !== 'email') {
    return (
      <>
        <div className="w-full items-center sm:items-start flex flex-col gap-6">
          <h1 className="font-bold w-full px-4">비밀번호 변경</h1>
          <p className=" w-full px-4 text-neutral-800 sm:text-base text-sm">
            소셜계정으로 로그인하신 회원님은 비밀번호를 변경할 수 없습니다.
          </p>
        </div>
      </>
    );
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPasswordValue(newPassword);

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(newPassword)) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 하며, 최소 하나의 대문자, 소문자, 숫자가 포함되어야 합니다.');
    } else {
      setPasswordError(null);
    }
  };

  const reauthenticateHandler = async () => {
    const {
      data: { error }
    } = await axios('/auth/profile/reauthenticate-user');
    if (error) {
      alert('error');
    } else {
      setHasEmailSent(true);
      return messageApi.open({
        type: 'info',
        content: '등록하신 이메일로 코드를 보냈습니다. 코드를 입력해주세요.'
      });
    }
  };

  const changePasswordHandler = async () => {
    if (nonceValue.length !== 6) {
      return messageApi.open({
        type: 'error',
        content: `올바른 코드를 적어주세요.`
      });
    }
    const {
      data: { data, error }
    } = await axios.post('/auth/profile/change-password', { nonce: nonceValue, password: passwordValue });

    if (error) {
      if (error.includes('should be different')) {
        return messageApi.open({
          type: 'error',
          content: `예전 비밀번호와 같습니다. 다른 비밀번호를 사용해주세요.`
        });
      }
      return messageApi.open({
        type: 'error',
        content: `에러가 발생했습니다. 다시 시도해주세요.`
      });
    } else {
      setDisableInputs(true);
      return messageApi.open({
        type: 'success',
        content: `비밀번호가 성공적으로 변경되었습니다.`
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="w-full items-center sm:items-start flex flex-col gap-6">
        <h1 className="text-center sm:text-start font-bold w-full px-4">비밀번호 변경</h1>
        {hasEmailSent && (
          <div className="w-full flex flex-col items-center sm:items-start gap-4">
            <Input
              minLength={6}
              disabled={disableInput}
              placeholder="6자리 코드"
              type="text"
              className="w-full py-2.5 max-w-[350px]"
              value={nonceValue}
              onChange={(e) => setNonceValue(e.target.value)}
            />

            <Input.Password
              disabled={disableInput}
              className="w-full py-2.5 max-w-[350px]"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="비밀번호"
              value={passwordValue}
              onChange={(e) => handlePasswordChange(e)}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              required
            />
          </div>
        )}
        {/* sends code */}
        {!hasEmailSent && (
          <Popconfirm
            title="사용자 인증"
            description="인증 메일을 전송하시겠습니까?"
            onConfirm={reauthenticateHandler}
            okText="전송"
            okType="default"
            cancelText="취소"
          >
            <Button type="primary" className="w-full max-w-[350px] sm:w-full button-dark py-2.5 h-full">
              메일 인증하기
            </Button>
          </Popconfirm>
        )}
        {/* 2: got the code */}
        {hasEmailSent && (
          <Popconfirm
            title="비밀번호 변경"
            description="정말 비밀번호를 변경하시겠습니까?"
            onConfirm={changePasswordHandler}
            okText="변경"
            okType="danger"
            cancelText="취소"
          >
            <Button type="primary" className="w-full max-w-[350px] sm:w-full button-dark py-2 h-full">
              변경하기
            </Button>
          </Popconfirm>
        )}
      </div>
    </>
  );
};

export default ChangePassword;
