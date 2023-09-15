'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ChangePasswordFromMail = () => {
  const supabase = createClientComponentClient();
  const [newPassword, setNewPassword] = useState<string>('');
  const router = useRouter();

  //
  const updatePasswordHandler = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) {
      if (error.message.includes('should be different')) {
        alert('예전 비밀번호와 같습니다. 다른 비밀번호를 입력해주세요.');
        return;
      }
      alert('에러가 발생했습니다. 다시 시도해주세요.');
      // router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}`);
      return;
    }
    alert('성공했습니다');
    router.refresh();
    router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  };
  return (
    <div className="h-[calc(100vh-80px)] flex justify-center items-center">
      <form action={updatePasswordHandler} className="w-10/12 md:w-6/12 lg:w-4/12 flex flex-col px gap-3 items-center">
        <h1 className="text-center text-2xl">새로운 비밀번호를 입력하세요.</h1>
        <input
          className="peer custom_input"
          type="password"
          name="password"
          pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{1,}$"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit" className="custom_button">
          등록
        </button>

        <p className="w-3/4 text-center hidden peer-invalid:block duration-150 ease-in">
          비밀번호는 특수문자와 대문자를 포함한 8자리 이상으로 설정해주세요.
        </p>
      </form>
    </div>
  );
};

export default ChangePasswordFromMail;
