'use client';

/* eslint-disable react/no-unescaped-entities */

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import { message } from 'antd';
import { useRef, useState } from 'react';

interface Props {
  user: User;
}

const UpdateEmail = ({ user }: Props) => {
  const userPrevEmail = user.email as string;
  const appMetadata = user.app_metadata;

  const [emailValue, setEmailValue] = useState<string>(userPrevEmail);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [messageApi, contextHolder] = message.useMessage();

  if (appMetadata.provider !== 'email') {
    return (
      <>
        소셜 로그인을 이용중입니다. <br />
        소셜 로그인 사용자는 이메일을 변경할 수 없습니다.
      </>
    );
  }

  const editHandler = async () => {
    if (buttonRef.current && buttonRef.current.innerText === '수정') {
      if (confirm('수정하시겠습니까?')) {
        setIsDisabled(false);
        if (inputRef.current) {
          setTimeout(() => {
            inputRef.current!.focus();
          }, 0);

          buttonRef.current!.innerText = '확인';
        }
      }
    } else if (buttonRef.current && buttonRef.current.innerText === '확인') {
      if (confirm('정말 이메일을 변경하시겠습니까?')) {
        if (userPrevEmail === emailValue) {
          messageApi.open({
            type: 'warning',
            content: '예전과 동일한 이메일 주소입니다.'
          });
          return;
        }
        const supabase = createClientComponentClient();
        const { data, error } = await supabase.auth.updateUser({ email: emailValue });

        if (error) {
          if (error.message.includes('address has already')) {
            messageApi.open({
              type: 'warning',
              content: '이미 등록된 계정입니다. 다른 이메일을 사용해주세요.'
            });
            return;
          }
          messageApi.open({
            type: 'error',
            content: '에러가 발생했습니다. 다시 시도해주세요.'
          });
          return;
        }

        if (data) {
          messageApi.open({
            type: 'success',
            content: '새로 등록한 메일주소의 수신함을 확인해주세요.'
          });
        }

        setIsDisabled(true);
        if (inputRef.current) {
          buttonRef.current!.innerText = '수정';
        }
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="w-10/12">
        <h2>이메일</h2>
        <form action={editHandler} className="flex gap-4">
          <input
            className="py-1 px-3 shadow-sm shadow-gray-400"
            ref={inputRef}
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            disabled={isDisabled}
          />
          <button className="py-1 px-3 shadow-sm shadow-gray-400" ref={buttonRef}>
            수정
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateEmail;
