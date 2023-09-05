import Image from 'next/image';
import HeaderMenuButton from './HeaderMenuButton';

type UserData = Database['public']['Tables']['users']['Row'];

const HeaderUser = ({ userData }: { userData: UserData }) => {
  return (
    <div className="flex gap-5 items-center mr-4">
      <HeaderMenuButton userData={userData} />
      <div className="rounded-full overflow-hidden shadow-sm shadow-gray-400">
        <Image
          className="w-9 h-9"
          src={userData.avatar_url!}
          alt="user profile"
          width={32}
          height={32}
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
          blurDataURL={'/anonymous-avatar-icon.png'}
        />
      </div>
      <h3 className="body1_regular_suit">{userData.username}</h3>
    </div>
  );
};

export default HeaderUser;
