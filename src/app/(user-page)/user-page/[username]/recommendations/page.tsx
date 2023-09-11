import UserPageMostWatchedGenres from '@/components/UserPage/UserInfo/MostWatchedGenres';
import RecommendationList from '@/components/UserPage/RecommendationList/_RecommendationList';
import publicApi from '@/util/supabase/auth/public';
import authApi from '@/util/supabase/auth/auth';

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
      <div className="flex flex-col items-center w-full mt-10 h-[calc(100%-54px)] justify-center">
        <p className="w-full text-2xl text-center">추천목록은 해당 회원만 볼 수 있습니다.</p>
      </div>
    );
  }

  const signedInUserId = session.user.id;
  const { id: pageUserId } = await publicApi.get('username to id', { username: pageUsername });

  const { username: signedInUsername } = await publicApi.get('id to username', { id: signedInUserId });

  if (pageUsername !== signedInUsername) {
    return (
      <div className="flex flex-col items-center w-full mt-10 h-[calc(100%-54px)] justify-center">
        <p className="w-full text-2xl text-center">추천목록은 해당 회원만 볼 수 있습니다.</p>
      </div>
    );
  }

  const { likedMovies } = await publicApi.get('liked movies', { id: pageUserId! });

  return (
    <>
      <UserPageMostWatchedGenres username={pageUsername} />
      {likedMovies!.length === 0 ? (
        <div className="flex flex-col items-center w-full mt-10  h-full">
          <h2 className="text-center font-bold text-2xl">{pageUsername}님을 위한 추천 리스트!</h2>
          <div className="flex gap-y-10 justify-center sm:gap-10 md:gap-5 gap-5 items-center h-full">
            <p className="w-full text-2xl text-center">추천을 받기 위해 평점이나 리뷰를 남겨주세요.</p>
          </div>
        </div>
      ) : (
        <RecommendationList username={pageUsername} likedMovies={likedMovies!} />
      )}
    </>
  );
};

export default RecommendationPage;
