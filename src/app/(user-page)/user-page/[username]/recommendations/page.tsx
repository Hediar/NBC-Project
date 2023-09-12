import UserPageMostWatchedGenres from '@/components/UserPage/UserInfo/MostWatchedGenres';
import RecommendationList from '@/components/UserPage/RecommendationList/_RecommendationList';
import publicApi from '@/util/supabase/auth/public';
import authApi from '@/util/supabase/auth/auth';
import NoContent from '@/styles/svg/NoContent';
import { Button } from 'antd';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    username: string;
  };
}

const RecommendationPage = async ({ params }: Props) => {
  const pageUsername = decodeURIComponent(params.username);
  const { session } = await authApi.get('session');

  if (!session) {
    return (
      <div className="px-3 sm:px-10 flex flex-col items-center justify-center w-full mt-10  h-full">
        <h2 className="text-lg text-center font-bold sm:text-2xl mb-10">{pageUsername}님의 추천 영화 목록</h2>
        <div className="flex flex-col gap-y-10 justify-center gap-10 items-center h-full pb-5">
          <p className="text-base sm:text-2xl w-full  text-center">추천목록은 해당 회원만 볼 수 있습니다.</p>
          <NoContent />
          <Link href="?sign-in=true">
            <Button
              type="primary"
              className="px-5 py-2.5 bg-zinc-600 rounded-lg border border-zinc-600 h-full sm:text-base text-white"
            >
              로그인 하기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const signedInUserId = session.user.id;
  const { id: pageUserId } = await publicApi.get('username to id', { username: pageUsername });

  const { username: signedInUsername } = await publicApi.get('id to username', { id: signedInUserId });

  if (pageUsername !== signedInUsername) {
    return (
      <div className="px-3 sm:px-10 flex flex-col items-center justify-center w-full mt-10  h-full">
        <h2 className="text-lg text-center font-bold sm:text-2xl mb-10">{pageUsername}님의 추천 영화 목록</h2>
        <div className="flex flex-col gap-y-10 justify-center gap-10 items-center h-full pb-5">
          <p className="text-base sm:text-2xl w-full  text-center">추천목록은 해당 회원만 볼 수 있습니다.</p>
          <NoContent />
          <Link href={`/user-page/${signedInUsername}/recommendations`}>
            <Button
              type="primary"
              className="px-5 py-2.5 bg-zinc-600 rounded-lg border border-zinc-600 h-full sm:text-base text-white"
            >
              나의 추천 목록으로 가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { likedMovies } = await publicApi.get('liked movies', { id: pageUserId! });

  return (
    <>
      <UserPageMostWatchedGenres username={pageUsername} />
      {likedMovies!.length === 0 ? (
        <div className="px-3 sm:px-10 flex flex-col items-center justify-center w-full mt-10  h-full">
          <h2 className="text-lg text-center font-bold sm:text-2xl mb-10">{pageUsername}님을 위한 추천 리스트!</h2>
          <div className="flex flex-col gap-y-10 justify-center gap-10 items-center h-full pb-5">
            <p className="text-base sm:text-2xl w-full  text-center">추천을 받기 위해 콘텐츠 좋아요를 눌러주세요.</p>
            <NoContent />
            <Link href="/movielist">
              <Button
                type="primary"
                className="px-5 py-2.5 bg-zinc-600 rounded-lg border border-zinc-600 h-full sm:text-base text-white"
              >
                영화페이지로 이동
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <RecommendationList username={pageUsername} likedMovies={likedMovies!} />
      )}
    </>
  );
};

export default RecommendationPage;
