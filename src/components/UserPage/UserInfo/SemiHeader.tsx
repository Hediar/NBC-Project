import React from 'react';

interface Props {
  params: string;
  avatar_url: string;
}

const UserPageSemiHeader = async ({ params: username, avatar_url }: Props) => {
  return (
    <div className="mt-[50px] w-full bg-[#f0743f] h-[120px] xl:h-[70px]  rounded-xl p-5 animate-300">
      <div className="h-full flex gap-5 items-center ml-5">
        <img className="rounded-full w-10 h-10" src={avatar_url} alt="user profile" />
        <span className="text-white subtitle2_suit">{username}</span>
      </div>
    </div>
  );
};

export default UserPageSemiHeader;
