import Link from 'next/link';

const UserSettingsTabs = () => {
  return (
    <div className="w-2/12">
      <div className="bg-white p-5 shadow-md shadow-gray-300 flex flex-col gap-2 font-semibold min-w-[120px] max-w-[200px] ">
        <Link href={'?my-account=true'}>내 계정</Link>
        <Link href={'?change-info=true'}>정보 변경</Link>
        <Link href={'?my-menu=true'}>나의 메뉴</Link>
        <Link href={'?delete-account=true'}>계정 삭제</Link>
      </div>
    </div>
  );
};

export default UserSettingsTabs;
