import { User } from '@supabase/supabase-js';
import AvatarPhoto from './Profile/AvatarPhoto';
import UpdateOtherInfo from './Profile/UpdateOtherInfo';
import UpdateUsername from './Profile/UpdateUsername';
import Miscellaneous from './Profile/Miscellaneous';
interface Props {
  user: User;
  avatarUrl: string;
  userId: string;
  username: string;
}

const UserSettingsProfile = ({ user, avatarUrl, userId, username }: Props) => {
  return (
    <div className="w-10/12 bg-white shadow-md shadow-gray-300 p-8">
      <div className="flex gap-4 justify-between w-full">
        <AvatarPhoto avatarUrl={avatarUrl} userId={userId} username={username} />
        <Miscellaneous user={user} />
      </div>

      <UpdateUsername user={user} userId={userId} />
      <UpdateOtherInfo />
    </div>
  );
};

export default UserSettingsProfile;
