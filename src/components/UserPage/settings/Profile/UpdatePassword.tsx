'use client';

import { User } from '@supabase/supabase-js';
import { message } from 'antd';
import axios from 'axios';
import { useRef, useState } from 'react';

interface Props {
  user: User;
}

const UpdatePassword = ({ user }: Props) => {
  const appMetadata = user.app_metadata;
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [nonceValue, setNonceValue] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [hasEmailSent, setHasEmailSent] = useState<boolean>(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nonceInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [messageApi, contextHolder] = message.useMessage();

  if (appMetadata.provider !== 'email') {
    return (
      <>
        소셜 로그인을 이용중입니다. <br />
        소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.
      </>
    );
  }
  const clickHandler = async () => {
    if (buttonRef.current?.innerText === '수정') {
      setIsDisabled(false);
      setTimeout(() => {
        buttonRef.current!.innerText = '인증메일보내기';
        passwordInputRef.current?.focus();
      }, 0);
      return;
    } else {
      const {
        data: { data: result, error }
      } = await axios.post('/auth/profile/password', { password: passwordValue, nonce: nonceValue });
      if (error) {
        console.log(error);
        if (error.includes('6 characters')) {
          messageApi.open({
            type: 'warning',
            content: '비밀번호는 6자리 이상으로 사용해주세요.'
          });
          return;
        }
        if (error.includes('should be different')) {
          messageApi.open({
            type: 'error',
            content: '이전 비밀번호와 같습니다. 다른 비밀번호를 사용해주세요.'
          });
          return;
        }
        messageApi.open({
          type: 'error',
          content: '실패하였습니다. 다시 시도해주세요.'
        });

        return;
      }

      if (result) {
        if (result.includes('이메일')) {
          setHasEmailSent(true);
          setTimeout(() => {
            buttonRef.current!.innerText = '인증';
            nonceInputRef.current?.focus();
          }, 0);
          messageApi.open({
            type: 'success',
            content: '이메일을 확인해주세요.'
          });
          return;
        } else {
          messageApi.open({
            type: 'success',
            content: '변경되었습니다.'
          });
          setIsDisabled(true);
          setHasEmailSent(false);
          setTimeout(() => {
            buttonRef.current!.innerText = '수정';
          }, 0);
        }
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div>
        <div className="flex  gap-6">
          <div>
            <h2>비밀번호 변경</h2>
            <div className="flex gap-4">
              <input
                className="py-1 px-3 shadow-sm shadow-gray-400"
                type="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                disabled={isDisabled}
                ref={passwordInputRef}
                placeholder="새로운 비밀번호"
                maxLength={15}
              />
              {hasEmailSent && (
                <input
                  className="py-1 px-3 shadow-sm shadow-gray-400"
                  name="nonce"
                  type="text"
                  ref={nonceInputRef}
                  value={nonceValue}
                  onChange={(e) => setNonceValue(e.target.value)}
                />
              )}
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

export default UpdatePassword;
