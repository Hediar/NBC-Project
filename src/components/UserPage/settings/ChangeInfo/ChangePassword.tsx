'use client';

import { User } from '@supabase/supabase-js';
import React, { useRef, useState } from 'react';
import { Popconfirm, message } from 'antd';
import axios from 'axios';
import SVG_HidePassword from '@/styles/svg/SVG_HidePassword';
import SVG_ShowPassword from '@/styles/svg/SVG_ShowPassword';

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPasswordValue(newPassword);

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(newPassword)) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 하며, 최소 하나의 대문자, 소문자, 숫자가 포함되어야 합니다.');
    } else {
      setPasswordError(null);
    }
  };

  if (appMetadata.provider !== 'email') {
    return (
      <div>
        소셜 로그인을 이용중입니다. <br />
        소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.
      </div>
    );
  }

  const reauthenticateHandler = async () => {
    const {
      data: { error }
    } = await axios('/auth/profile/reauthenticate-user');
    if (error) {
      alert('error');
      console.log(error);
    } else {
      setHasEmailSent(true);
      return messageApi.open({
        type: 'info',
        content: '등록하신 이메일로 코드를 보냈습니다. 코드를 입력해주세요.'
      });
    }
  };

  const changePasswordHandler = async () => {
    const {
      data: { data, error }
    } = await axios.post('/auth/profile/change-password', { nonce: nonceValue, password: passwordValue });
    console.log('성공했다면,', data);

    if (error) {
      console.log(error);
      return messageApi.open({
        type: 'error',
        content: `에러가 발생했습니다. \n에러: ${error}`
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
        <h1 className="w-full px-4">비밀번호 변경</h1>
        {hasEmailSent && (
          <div className="flex flex-col gap-4">
            <input
              disabled={disableInput}
              placeholder="6자리 코드"
              type="text"
              className="custom_input"
              style={{ width: '350px' }}
              value={nonceValue}
              onChange={(e) => setNonceValue(e.target.value)}
            />
            <div ref={outerDivRef} className="outer_div" style={{ width: '350px' }}>
              <input
                disabled={disableInput}
                className="inner_input"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="비밀번호"
                style={{ width: '350px' }}
                value={passwordValue}
                onChange={(e) => handlePasswordChange(e)}
                onFocus={() => {
                  outerDivRef.current?.classList.add('outer_div_on_focus');
                }}
                onBlur={() => {
                  outerDivRef.current?.classList.remove('outer_div_on_focus');
                }}
                onInvalid={() => {
                  outerDivRef.current?.classList.add('outer_div_on_invalid');
                }}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <SVG_HidePassword className="w-6 h-6 opacity-30 hover:opacity-80 transform ease-in-out duration-200" />
                ) : (
                  <SVG_ShowPassword className="w-6 h-6 opacity-30 hover:opacity-80 transform ease-in-out duration-200" />
                )}
              </button>
            </div>
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
            <div className="w-[350px] sm:w-auto">
              <button className="w-full button-dark">메일 인증하기</button>
            </div>
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
            <div className="w-[350px] sm:w-auto">
              <button className="w-full button-dark ">변경하기</button>
            </div>
          </Popconfirm>
        )}
      </div>
    </>
  );
};

export default ChangePassword;
