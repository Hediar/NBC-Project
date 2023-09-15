'use client';

import { message } from 'antd';
import axios from 'axios';
import { useRef, useState } from 'react';

interface Props {
  userData: Database['public']['Tables']['users']['Row'];
}

const UpdateName = ({ userData }: Props) => {
  const name = userData.name! ?? '';
  const userId = userData.id!;

  const [nameValue, setNameValue] = useState<string>(name);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const clickHandler = async () => {
    if (buttonRef.current?.innerText === '수정') {
      setIsDisabled(false);
      setTimeout(() => {
        buttonRef.current!.innerText = '확인';
        inputRef.current?.focus();
      }, 0);
    } else {
      if ('수정하시겠습니까?') {
        const {
          data: { data, error }
        } = await axios.post('/auth/profile/name', { userId, name: nameValue });
        if (error) {
          messageApi.open({
            type: 'error',
            content: '실패하였습니다. 다시 시도해주세요.'
          });
        }
        if (data) {
          messageApi.open({
            type: 'success',
            content: '변경되었습니다'
          });
          setIsDisabled(true);
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
            <h2>이름</h2>
            <div className="flex gap-4">
              <input
                className="py-1 px-3 shadow-sm shadow-gray-400"
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                disabled={isDisabled}
                ref={inputRef}
                placeholder="이름을 등록해주세요"
                maxLength={15}
              />
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

export default UpdateName;
