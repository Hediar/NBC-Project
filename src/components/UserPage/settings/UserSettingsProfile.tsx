import AvatarPhoto from './Profile/AvatarPhoto';
import UpdateUsername from './Profile/UpdateUsername';
interface Props {
  avatarUrl: string;
  userId: string;
  username: string;
}

const UserSettingsProfile = ({ avatarUrl, userId, username }: Props) => {
  return (
    <div className="w-10/12 bg-white shadow-md shadow-gray-300 p-8">
      <AvatarPhoto avatarUrl={avatarUrl} userId={userId} username={username} />
      <UpdateUsername userId={userId} />
    </div>
  );
};

export default UserSettingsProfile;
