import Image from 'next/image';
import HeaderMenuButton from './HeaderMenuButton';
import authApi from '@/util/supabase/auth/auth';

const HeaderUser = async () => {
  const { userData } = await authApi.get('userData');

  return (
    <div className="sm:flex-row-reverse flex gap-2 sm:gap-5 items-center mr-4">
      <HeaderMenuButton userData={userData} />
      {userData && (
        <>
          <div className="rounded-full overflow-hidden shadow-sm shadow-gray-400">
            <Image
              className="w-9 h-9"
              src={userData.avatar_url!}
              alt="user profile"
              width={32}
              height={32}
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <h3 className="hidden lg:block body1_regular_suit">{userData.username}</h3>
        </>
      )}
    </div>
  );
};

export default HeaderUser;
