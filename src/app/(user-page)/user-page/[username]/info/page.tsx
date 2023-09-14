import UserPagePersonalRecords from '@/components/UserPage/UserInfo/PersonalRecords/PersonalRecords';
import UserPagePersonalRecordsGraph from '@/components/UserPage/UserInfo/PersonalRecords/PersonalRecordsGraph';
import UserPageSemiHeader from '@/components/UserPage/UserInfo/SemiHeader';

const UserInfoPage = async ({ params }: { params: { username: string } }) => {
  const pageUsername = decodeURIComponent(params.username);

  return (
    <div className="w-[96%] sm:w-10/12 h-full pb-20">
      <UserPageSemiHeader params={pageUsername} />
      <UserPagePersonalRecords params={pageUsername} />
      <UserPagePersonalRecordsGraph params={pageUsername} />
    </div>
  );
};

export default UserInfoPage;
