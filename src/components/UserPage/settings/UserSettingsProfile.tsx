import { User } from '@supabase/supabase-js';
import AvatarPhoto from './Profile/AvatarPhoto';
import UpdateUsername from './Profile/UpdateUsername';
import Miscellaneous from './Profile/Miscellaneous';
import UpdateEmail from './Profile/UpdateEmail';
import UpdateName from './Profile/UpdateName';
import UpdatePassword from './Profile/UpdatePassword';
import DeleteUser from './Profile/DeleteUser';

interface Props {
  user: User;
  userData: Database['public']['Tables']['users']['Row'];
}

const UserSettingsProfile = ({ user, userData }: Props) => {
  return (
    <div className="w-10/12 bg-white shadow-md shadow-gray-300 p-8">
      <div className="flex gap-4 justify-between w-full">
        <AvatarPhoto userData={userData} />
        <Miscellaneous user={user} />
      </div>
      <UpdateEmail user={user} />
      <UpdateUsername userData={userData} />
      <UpdateName userData={userData} />
      <UpdatePassword />
      <DeleteUser />
    </div>
  );
};

export default UserSettingsProfile;
