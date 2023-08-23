'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const basicStyle = 'pb-2 z-10 cursor-pointer hover:border-b-2 hover:border-slate-500 transform ease-in duration-200';
const onSelectedStyle = 'border-b-2 border-slate-600';

const UserPageTabs = ({ username }: { username: string }) => {
  const pathname = usePathname();

  return (
    <div className="mt-5 w-full flex gap-3 justify-center relative">
      <div className="w-8/12 flex gap-7">
        <Link
          href={`/user-page/${username}/info`}
          className={`${basicStyle} ${pathname.includes('info') && onSelectedStyle}`}
        >
          내 정보
        </Link>
        <Link
          href={`/user-page/${username}/recommendations`}
          className={`${basicStyle} ${pathname.includes('recommendations') && onSelectedStyle}`}
        >
          추천 목록
        </Link>
        <Link
          href={`/user-page/${username}/watch-later`}
          className={`${basicStyle} ${pathname.includes('watch-later') && onSelectedStyle}`}
        >
          찜 목록
        </Link>
        <Link
          href={`/user-page/${username}/likes`}
          className={`${basicStyle} ${pathname.includes('likes') && onSelectedStyle}`}
        >
          좋아요 목록
        </Link>
        <Link
          href={`/user-page/${username}/reviews`}
          className={`${basicStyle} ${pathname.includes('reviews') && onSelectedStyle}`}
        >
          내가 작성한 리뷰
        </Link>
      </div>
      <div className="absolute bottom-0 border-b-2 border-slate-200 w-full"></div>
    </div>
  );
};

export default UserPageTabs;
