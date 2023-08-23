import UserPageMostWatchedGenres from '@/components/UserPage/Main/UserPageMostWatchedGenres';
import UserPagePersonalRecords from '@/components/UserPage/Main/UserPagePersonalRecords';
import UserPageSemiHeader from '@/components/UserPage/Main/UserPageSemiHeader';
import UserPageTabs from '@/components/UserPage/Main/UserPageTabs';
import React from 'react';

interface Props {
  params: {
    username: string;
  };
}

const UserPage = ({ params }: Props) => {
  const decodedParams = decodeURIComponent(params.username);

  return (
    <>
      <UserPageTabs />
      <UserPageSemiHeader params={decodedParams} />
      <UserPagePersonalRecords />
      <UserPageMostWatchedGenres params={decodedParams} />
    </>
  );
};

export default UserPage;
