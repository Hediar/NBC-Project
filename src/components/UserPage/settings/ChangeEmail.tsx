'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserAppMetadata } from '@supabase/supabase-js';
import { useRef, useState } from 'react';

interface Props {
  appMetadata: UserAppMetadata;
  userPrevEmail: string;
}

const ChangeEmail = ({ appMetadata, userPrevEmail }: Props) => {
  const [emailValue, setEmailValue] = useState<string>(userPrevEmail);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (appMetadata.provider !== 'email') {
    return (
      <>
        소셜 로그인을 이용중입니다. <br />
        소셜 로그인 사용자는 이메일을 변경할 수 없습니다.
      </>
    );
  }

  const editHandler = async () => {
    if (buttonRef.current && buttonRef.current.innerText === '수정하기') {
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
          alert('예전과 동일한 이메일 주소입니다.');
          return;
        }
        const supabase = createClientComponentClient();
        const { data, error } = await supabase.auth.updateUser({ email: emailValue });

        if (error) {
          if (error.message.includes('address has already')) {
            alert('이미 등록된 계정입니다. 다른 이메일을 사용해주세요.');
            return;
          }
          alert('에러가 발생했습니다. 다시 시도해주세요.');
          return;
        }

        if (data) {
          alert('새로 등록한 메일주소의 수신함을 확인해주세요.');
        }
        console.log(data);

        setIsDisabled(true);
        if (inputRef.current) {
          buttonRef.current!.innerText = '수정하기';
        }
      }
    }
  };

  return (
    <div className="w-3/4">
      <h1>이메일 변경하기</h1>
      <form action={editHandler}>
        <h2>메인 이메일 주소</h2>
        <input
          ref={inputRef}
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          disabled={isDisabled}
        />
        <button ref={buttonRef}>수정하기</button>
      </form>
    </div>
  );
};

export default ChangeEmail;
