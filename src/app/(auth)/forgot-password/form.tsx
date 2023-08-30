'use client';

import useToggleSignInModal from '@/store/toggleSignInModal';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ChangePasswordFromMail = () => {
  const supabase = createClientComponentClient();
  const [newPassword, setNewPassword] = useState<string>('');
  const router = useRouter();
  const { isSignInModalOpen, setIsSignInModalOpen } = useToggleSignInModal();

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
    <div>
      <form action={updatePasswordHandler}>
        <h1>새로운 비밀번호를 입력하세요</h1>
        <input
          className="border border-gray-400 py-1 px-2"
          type="password"
          name="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="border border-gray-400 py-1 px-2">등록</button>
      </form>
    </div>
  );
};

export default ChangePasswordFromMail;