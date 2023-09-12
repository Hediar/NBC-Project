'use client';

import Image from 'next/image';
import HeaderMenuButton from './HeaderMenuButton';
import useUserInfoStore from '@/store/saveCurrentUserData';
import { Dropdown, MenuProps, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import ChooseProfile from '../UserPage/settings/MyAccount/ChooseProfile';
import useToggleChangeAvatar from '@/store/toggleChangeAvatarModal';

const items: MenuProps['items'] = [
  {
    label: <span>아바타 변경</span>,
    key: '아바타 변경'
  },
  {
    label: <span>내 계정</span>,
    key: '내 계정'
  },
  {
    label: <span>정보 변경</span>,
    key: '정보 변경'
  },
  {
    label: <span>나의 메뉴</span>,
    key: '나의 메뉴'
  }
];

const HeaderUser = () => {
  const { userInfo: userData } = useUserInfoStore();
  const router = useRouter();
  const { isChangeAvatarModalOpen, setIsChangeAvatarModalOpen } = useToggleChangeAvatar();

  if (!userData.id) {
    return <HeaderMenuButton userData={userData} />;
  } else {
    const onClick: MenuProps['onClick'] = ({ key }) => {
      if (key === '내 계정') {
        return router.push(`/user-page/${userData.username}/settings?my-account=true`);
      } else if (key === '정보 변경') {
        return router.push(`/user-page/${userData.username}/settings?change-info=true`);
      } else if (key === '나의 메뉴') {
        return router.push(`/user-page/${userData.username}/settings?my-menu=true`);
      } else if (key === '아바타 변경') {
        return setIsChangeAvatarModalOpen(true);
      }
    };

    return (
      <>
        <div className="sm:flex-row-reverse flex gap-2 sm:gap-5 items-center mr-4">
          <HeaderMenuButton userData={userData} />
          <Dropdown menu={{ items, onClick }} trigger={['click']}>
            <div className="rounded-full overflow-hidden shadow-sm shadow-gray-400 cursor-pointer">
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
          </Dropdown>
          <h3 className="hidden lg:block body1_regular_suit">{userData.username}</h3>
        </div>
        <Modal
          footer={false}
          open={isChangeAvatarModalOpen}
          onCancel={() => setIsChangeAvatarModalOpen(false)}
          title="기본 프로필"
        >
          <ChooseProfile />
        </Modal>
      </>
    );
  }
};

export default HeaderUser;
