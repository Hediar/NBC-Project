'use client';

import { message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

const DeleteUser = () => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const clickHandler = async () => {
    if (checkboxRef.current?.checked) {
      const {
        data: { data, error }
      } = await axios.post('/auth/delete-account');
      if (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: '에러가 발생했습니다. 다시 시도해주세요.'
        });
        return;
      } else {
        messageApi.open({
          type: 'success',
          content: '계정이 삭제되었습니다. 메인페이지로 이동합니다.'
        });
        router.refresh();
        router.replace(process.env.NEXT_PUBLIC_BASE_URL!);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div>
        <fieldset>
          <legend>계정삭제</legend>
          <h4>한 번 삭제하면 되돌릴 수 없습니다.</h4>
          <p>정말 계정을 삭제하시겠습니까?</p>
          <div className="flex gap-3 items-center">
            <input id="checkbox" className="peer/checkbox" ref={checkboxRef} type="checkbox" />
            <label htmlFor="checkbox" className="peer-checked/checkbox:text-red-500">
              계정 삭제에 동의합니다.
            </label>
            <button
              className="hidden py-1 px-2 shadow-sm shadow-gray-500 bg-gray-700 text-white peer-checked/checkbox:block"
              onClick={clickHandler}
            >
              계정삭제
            </button>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default DeleteUser;
