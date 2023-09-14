import Icon1 from '@/styles/svg/avatar/Icon1';
import Icon2 from '@/styles/svg/avatar/Icon2';
import Icon3 from '@/styles/svg/avatar/Icon3';
import Icon4 from '@/styles/svg/avatar/Icon4';
import Icon5 from '@/styles/svg/avatar/Icon5';
import { Button } from 'antd';
import IconContainer from './IconContainer';
import useIsProfileSelected from '@/store/isProfileSelected';
import axios from 'axios';
import useMessage from 'antd/es/message/useMessage';
import { useRouter } from 'next/navigation';
import useUserInfoStore from '@/store/saveCurrentUserData';
import useToggleChangeAvatar from '@/store/toggleChangeAvatarModal';

const ChooseProfile = () => {
  const { target, isSelected, setIsProfileSelected } = useIsProfileSelected();
  const [messageApi, messageContext] = useMessage();
  const router = useRouter();
  const { userInfo, saveUserInfo } = useUserInfoStore();
  const { isChangeAvatarModalOpen, setIsChangeAvatarModalOpen } = useToggleChangeAvatar();

  const onClickHandler = async () => {
    const {
      data: { newUrl, isError }
    } = await axios.post('/auth/profile/change-avatar', JSON.stringify({ target }));
    if (isError) {
      return messageApi.open({ type: 'error', content: '에러가 발생했습니다. 다시 시도해주세요.' });
    } else {
      saveUserInfo({ ...userInfo, avatar_url: newUrl.avatar_url });
      router.refresh();
      setIsChangeAvatarModalOpen(false);
      return messageApi.open({ type: 'success', content: '성공적으로 변경되었습니다.' });
    }
  };

  return (
    <>
      {messageContext}
      <div className="flex flex-col gap-6 w-full items-center">
        <h2 className="sm:text-base lg:text-lg font-medium">기본 프로필을 선택하세요.</h2>
        <div className="w-[90%] flex gap-2 items-center justify-center">
          <IconContainer targetId={0}>
            <Icon1 />
            <span className="sr-only">Default Avatar 1</span>
          </IconContainer>
          <IconContainer targetId={1}>
            <Icon2 />
            <span className="sr-only">Default Avatar 2</span>
          </IconContainer>
          <IconContainer targetId={2}>
            <Icon3 />
            <span className="sr-only">Default Avatar 3</span>
          </IconContainer>
          <IconContainer targetId={3}>
            <Icon4 />
            <span className="sr-only">Default Avatar 4</span>
          </IconContainer>
          <IconContainer targetId={4}>
            <Icon5 />
            <span className="sr-only">Default Avatar 5</span>
          </IconContainer>
        </div>
        <Button
          onClick={onClickHandler}
          type="primary"
          className="w-[50%] h-full p-2 bg-gray-600 mb-5  disabled:hover:bg-slate-50"
        >
          선택완료
        </Button>
      </div>
    </>
  );
};

export default ChooseProfile;
