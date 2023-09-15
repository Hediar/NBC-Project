'use client';

import { usePathname } from 'next/navigation';
import { message } from 'antd';
import useUserInfoStore from '@/store/saveCurrentUserData';
import Link from 'next/link';

const DiscussionRegistBtn = () => {
  const {
    userInfo: { id: userId }
  } = useUserInfoStore();

  const pathname = usePathname();
  const [messageApi, contextHolder] = message.useMessage();

  const handleRegistBtn = () => {
    if (!userId) messageApi.open({ type: 'warning', content: '로그인 해주세요' });
  };
  return (
    <>
      {contextHolder}
      <Link
        href={userId ? `/discussion/regist` : `${pathname}?sign-in=true`}
        className="border py-1 px-2 rounded-xl bg-gray-400 text-white hover:bg-gray-500"
        onClick={handleRegistBtn}
      >
        글 작성
      </Link>
    </>
  );
};

export default DiscussionRegistBtn;
