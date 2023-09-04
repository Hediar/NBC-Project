import Image from 'next/image';
import HeaderMenuButton from './HeaderMenuButton';

type UserData = Database['public']['Tables']['users']['Row'];

const HeaderUser = ({ userData }: { userData: UserData }) => {
  return (
    <div className="flex gap-5 items-center mr-4">
      <HeaderMenuButton userData={userData} />
      <div className="rounded-full overflow-hidden">
        <Image
          className="w-10 h-10"
          src={userData.avatar_url!}
          alt="user profile"
          width={40}
          height={40}
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
