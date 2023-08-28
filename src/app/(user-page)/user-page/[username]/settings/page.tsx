import ChangeEmail from '@/components/UserPage/settings/ChangeEmail';
import UserSettingsTabs from '@/components/UserPage/settings/UserSettingsTabs';

const UserSettingsPage = () => {
  return (
    <div className="flex w-8/12 pt-10 h-[calc(100vh-134px)]">
      <UserSettingsTabs />
      <ChangeEmail />
    </div>
  );
};

export default UserSettingsPage;
