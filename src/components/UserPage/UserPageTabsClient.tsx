'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const basicStyle = 'pb-2 z-10 cursor-pointer hover:border-b-2 hover:border-slate-500 transform ease-in duration-200';
const onSelectedStyle = 'border-b-2 border-slate-600';

interface Props {
  username: string;
  signedInUserData: { user: User } | { user: null };
  userNotSignedIn: { isError: boolean };
}
const UserPageTabsClient = ({ username, signedInUserData, userNotSignedIn }: Props) => {
  const { userInfo } = useUserInfoStore();
  const [shouldSettingsMenuRevealed, setShouldSettingsMenuRevealed] = useState<boolean>(false);

  const path = usePathname() ?? '';
  const parts = path.split('/');
  const menu = parts[parts.length - 1];

  useEffect(() => {
    const getSignedInUser = async () => {
      if (!userNotSignedIn.isError) {
        const supabase = createClientComponentClient<Database>();
        const signedInUserId = signedInUserData.user!.id;
        const { data: publicUserData } = await supabase
          .from('users')
          .select('username')
          .eq('id', signedInUserId)
          .single();

        const signedInUsername = publicUserData!.username;

        if (username === signedInUsername) {
          setShouldSettingsMenuRevealed(true);
        }
      }
    };
    if (!userNotSignedIn.isError) {
      getSignedInUser();
    } else {
      setShouldSettingsMenuRevealed(false);
    }
  }, [signedInUserData.user, userNotSignedIn, username, userInfo]);

  return (
    <div className="mt-5 w-full flex gap-3 justify-center relative">
      <div className="w-10/12 flex gap-7">
        <Link
          href={`/user-page/${username}/info`}
          className={`${basicStyle} ${menu.includes('info') && onSelectedStyle}`}
        >
          유저 정보
        </Link>
        <Link
          href={`/user-page/${username}/recommendations`}
          className={`${basicStyle} ${menu.includes('recommendations') && onSelectedStyle}`}
        >
          추천 목록
        </Link>
        <Link
          href={`/user-page/${username}/watch-later`}
          className={`${basicStyle} ${menu.includes('watch-later') && onSelectedStyle}`}
        >
          찜 목록
        </Link>
        <Link
          href={`/user-page/${username}/likes`}
          className={`${basicStyle} ${menu.includes('likes') && onSelectedStyle}`}
        >
          좋아요 목록
        </Link>
        <Link
          href={`/user-page/${username}/reviews`}
          className={`${basicStyle} ${menu.includes('reviews') && onSelectedStyle}`}
        >
          내가 작성한 리뷰
        </Link>
        {shouldSettingsMenuRevealed && (
          <Link
            href={`/user-page/${username}/settings`}
            className={`${basicStyle} ${menu.includes('settings') && onSelectedStyle}`}
          >
            설정
          </Link>
        )}
      </div>
      <div className="absolute bottom-0 border-b-2 border-slate-200 w-full"></div>
    </div>
  );
};

export default UserPageTabsClient;
