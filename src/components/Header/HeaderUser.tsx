import Image from 'next/image';
import HeaderMenuButton from './HeaderMenuButton';

type UserData = Database['public']['Tables']['users']['Row'];

const HeaderUser = ({ userData }: { userData: UserData }) => {
  return (
    <div className="flex gap-5 items-center mr-4">
      <h3 className="text-white">{userData.username}</h3>
      {userData.avatar_url && userData.username && (
        <>
          <div className="rounded-full overflow-hidden">
            <Image
              className="w-10 h-10"
              src={userData.avatar_url}
              alt="user profile"
              width={40}
              height={40}
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={'/anonymous-avatar-icon.png'}
            />
          </div>
          <HeaderMenuButton userData={userData} />
        </>
      )}
    </div>
  );
};

export default HeaderUser;
