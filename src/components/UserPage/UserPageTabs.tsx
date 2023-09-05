import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import doesUsersMatch from '@/api/doesUserMatch';
import {
  BookFilled,
  BookLined,
  BookMarkLined,
  BookmarkFiiled,
  DiamondLined,
  HeartFilled,
  HeartLined,
  SettingFiiled,
  SettingLined,
  StarFilled,
  StarLined,
  UserFilled,
  UserLined
} from '@/styles/icons/Icons32';

import Link from 'next/link';
import React from 'react';

const UserPageTabs = async ({ username }: { username: string }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const userMatch = await doesUsersMatch(supabase, username);
  console.log(userMatch);

  return (
    <div className="flex flex-col items-center gap-5 mt-[80px]">
      <Link href={`/user-page/${username}/info`} className="group flex gap-2 items-center w-[140px] hover_scale5">
        <UserLined className="group-hover:hidden" />
        <UserFilled className="hidden group-hover:block" />
        <span className="body1_bold_suit text-[#888] group-hover:text-[#222]">
          {userMatch ? '내 정보' : '유저 정보'}
        </span>
      </Link>
      <Link
        href={`/user-page/${username}/recommendations`}
        className="group flex gap-2 items-center w-[140px] hover_scale5"
      >
        <StarLined className="group-hover:hidden" />
        <StarFilled className="hidden group-hover:block" />
        <span className="body1_bold_suit text-[#888] group-hover:text-[#222]">추천 목록</span>
      </Link>
      <Link
        href={`/user-page/${username}/watch-later`}
        className="group flex gap-2 items-center w-[140px] hover_scale5"
      >
        <BookMarkLined className="group-hover:hidden" />
        <BookmarkFiiled className="hidden group-hover:block" />
        <span className="body1_bold_suit text-[#888] group-hover:text-[#222]">찜 목록</span>
      </Link>
      <Link href={`/user-page/${username}/likes`} className="group flex gap-2 items-center w-[140px] hover_scale5">
        <HeartLined className="group-hover:hidden" />
        <HeartFilled className="hidden group-hover:block" />
        <span className="body1_bold_suit text-[#888] group-hover:text-[#222]">좋아요 목록</span>
      </Link>
      <Link href={`/user-page/${username}/reviews`} className="group flex gap-2 items-center w-[140px] hover_scale5">
        <BookLined className="group-hover:hidden" />
        <BookFilled className="hidden group-hover:block" />
        <span className="body1_bold_suit text-[#888] group-hover:text-[#222]">
          {userMatch ? '나의 리뷰' : '유저 리뷰'}
        </span>
      </Link>
      {/* <Link className="group flex gap-2 items-center w-[140px]">
        <DiamondLined />
        <span className="body1_bold_suit text-[#888] group-hover:text-[#222]">{userMatch ? '나의 토론' : '유저 토론'}</span>
      </Link> */}
      {userMatch && (
        <Link
          href={`/user-page/${username}/settings?my-account=true`}
          className="group flex gap-2 items-center w-[140px] hover_scale5"
        >
          <SettingLined className="group-hover:hidden" />
          <SettingFiiled className="hidden group-hover:block" />
          <span className="body1_bold_suit text-[#888] group-hover:text-[#222]">설정</span>
        </Link>
      )}
    </div>
  );
};

export default UserPageTabs;
