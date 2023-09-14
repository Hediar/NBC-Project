import UserPagePersonalRecords from '@/components/UserPage/UserInfo/PersonalRecords/PersonalRecords';
import UserPagePersonalRecordsGraph from '@/components/UserPage/UserInfo/PersonalRecords/PersonalRecordsGraph';
import UserPageSemiHeader from '@/components/UserPage/UserInfo/SemiHeader';

const UserInfoPage = async ({ params }: { params: { username: string } }) => {
  const username = decodeURIComponent(params.username);

  return (
    <div className="w-[96%] sm:w-10/12 h-full pb-20">
      <UserPageSemiHeader params={username} />
      <UserPagePersonalRecords params={username} />
      <UserPagePersonalRecordsGraph params={username} />
    </div>
  );
};

export default UserInfoPage;
