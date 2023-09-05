import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import doesUsersMatch from '@/api/doesUserMatch';
import {
  BookLined,
  BookMarkLined,
  DiamondLined,
  HeartLined,
  SettingLined,
  StarLined,
  UserFilled
} from '@/styles/icons/Icons32';

import Link from 'next/link';
import React from 'react';

const UserPageTabs = async ({ username }: { username: string }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const userMatch = await doesUsersMatch(supabase, username);
  console.log(userMatch);

  return (
    <div className="flex flex-col items-center gap-5 mt-[80px]">
      <Link href={`/user-page/${username}/info`} className="flex gap-2 items-center w-[140px] hover_scale5">
        <UserFilled />
        <span className="body1_bold_suit">{userMatch ? '내 정보' : '유저 정보'}</span>
      </Link>
      <Link href={`/user-page/${username}/recommendations`} className="flex gap-2 items-center w-[140px] hover_scale5">
        <StarLined />
        <span className="body1_bold_suit">추천 목록</span>
      </Link>
      <Link href={`/user-page/${username}/watch-later`} className="flex gap-2 items-center w-[140px] hover_scale5">
        <BookMarkLined />
        <span className="body1_bold_suit">찜 목록</span>
      </Link>
      <Link href={`/user-page/${username}/likes`} className="flex gap-2 items-center w-[140px] hover_scale5">
        <HeartLined />
        <span className="body1_bold_suit">좋아요 목록</span>
      </Link>
      <Link href={`/user-page/${username}/reviews`} className="flex gap-2 items-center w-[140px] hover_scale5">
        <BookLined />
        <span className="body1_bold_suit">{userMatch ? '나의 리뷰' : '유저 리뷰'}</span>
      </Link>
      {/* <Link className="flex gap-2 items-center w-[140px]">
        <DiamondLined />
        <span className="body1_bold_suit">{userMatch ? '나의 토론' : '유저 토론'}</span>
      </Link> */}
      {userMatch && (
        <Link
          href={`/user-page/${username}/settings?my-account=true`}
          className="flex gap-2 items-center w-[140px] hover_scale5"
        >
          <SettingLined />
          <span className="body1_bold_suit">설정</span>
        </Link>
      )}
    </div>
  );
};

export default UserPageTabs;
