import { User } from '@supabase/supabase-js';
import UpdateUsername from './Profile/UpdateUsername';
import UpdateEmail from './Profile/UpdateEmail';
import UpdateName from './Profile/UpdateName';
import UpdatePassword from './Profile/UpdatePassword';
import DeleteUser from './Profile/DeleteUser';

interface Props {
  user: User;
  userData: Database['public']['Tables']['users']['Row'];
}

const UserSettingsProfile = async ({ user, userData }: Props) => {
  return (
    <div className="w-10/12 bg-white shadow-md shadow-gray-300 p-8">
      <UpdateEmail user={user} />
      <UpdateUsername userData={userData} />
      <UpdateName userData={userData} />
      <UpdatePassword user={user} />
      <DeleteUser />
    </div>
  );
};

export default UserSettingsProfile;
