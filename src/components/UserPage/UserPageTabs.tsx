import Link from 'next/link';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const basicStyle = 'pb-2 z-10 cursor-pointer hover:border-b-2 hover:border-slate-500 transform ease-in duration-200';
const onSelectedStyle = 'border-b-2 border-slate-600';

const UserPageTabs = async ({ username }: { username: string }) => {
  let shouldSettingsMenuRevealed = false;
  const headersList = headers();
  const header_url = headersList.get('x-url');
  const parts = header_url!.split('/');
  const menu = parts[parts.length - 1];
  const usernameOnUrl = parts[parts.length - 2];
  const decodedUsernameOnUrl = decodeURIComponent(usernameOnUrl);

  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: signedInUserData } = await supabase.auth.getUser();
  const signedInUserId = signedInUserData.user!.id;

  const { data: publicUserData } = await supabase.from('users').select('username').eq('id', signedInUserId).single();
  const signedInUsername = publicUserData?.username;

  if (decodedUsernameOnUrl === signedInUsername) {
    shouldSettingsMenuRevealed = true;
  }
  console.log(menu.includes('settings'));
  return (
    <div className="mt-5 w-full flex gap-3 justify-center relative">
      <div className="w-8/12 flex gap-7">
        <Link
          href={`/user-page/${username}/info`}
          className={`${basicStyle} ${menu.includes('info') && onSelectedStyle}`}
        >
          내 정보
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

export default UserPageTabs;
