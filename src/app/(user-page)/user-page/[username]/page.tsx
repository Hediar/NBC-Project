import UserInfo from '@/components/UserPage/UserInfo/_UserInfo';
import UserPageTabs from '@/components/UserPage/UserPageTabs';
interface Props {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: Props) => {
  return (
    <>
      <UserPageTabs />
      <UserInfo params={params} />
    </>
  );
};

export default UserPage;
