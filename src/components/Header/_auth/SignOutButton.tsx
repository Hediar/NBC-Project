'use client';

import useUserInfoStore from '@/app/(store)/saveCurrentUserData';
import { usePathname, useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();
  const { deleteUserInfo } = useUserInfoStore();

  const clickHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await fetch('/auth/sign-out', { method: 'post' });
    router.refresh();
    deleteUserInfo();
  };

  return (
    <form>
      <button
        onClick={(e) => clickHandler(e)}
        className="h-full py-2 px-3 rounded-md shadow-sm shadow-gray-700 bg-slate-700 text-white active:bg-slate-600 text-sm flex items-center"
      >
        Sign out
      </button>
    </form>
  );
};

export default SignOutButton;
