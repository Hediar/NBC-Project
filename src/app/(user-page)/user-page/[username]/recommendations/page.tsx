import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import UserPageMostWatchedGenres from '@/components/UserPage/UserInfo/MostWatchedGenres';
import RecommendationList from '@/components/UserPage/RecommendationList/_RecommendationList';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    username: string;
  };
}

const RecommendationPage = async ({ params }: Props) => {
  const username = decodeURIComponent(params.username);
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: userData } = await supabase.from('users').select('watched_movies').eq('username', username);

  // 로그인한 사용자의 username 검색
  const { data: signedInUserIdData, error: signedInUserIdDataError } = await supabase.auth.getUser();

  // 로그인하지 않은 사용자이면,
  if (signedInUserIdDataError) {
    return (
      <div className="flex flex-col items-center w-full mt-10 h-[calc(100%-54px)] justify-center">
        <p className="w-full text-2xl text-center">추천목록은 해당 회원만 볼 수 있습니다.</p>
      </div>
    );
  }

  const signedUserId = signedInUserIdData.user.id;

  const { data: usernameData, error: usernameDataError } = await supabase
    .from('users')
    .select('username')
    .eq('id', signedUserId)
    .single();

  const signedUserUsername = usernameData?.username;
  if (username !== signedUserUsername) {
    return (
      <div className="flex flex-col items-center w-full mt-10 h-[calc(100%-54px)] justify-center">
        <p className="w-full text-2xl text-center">추천목록은 해당 회원만 볼 수 있습니다.</p>
      </div>
    );
  }

  // layout에서 검증하므로 ! 사용
  const watched_movies: string[] = userData![0].watched_movies;

  return (
    <>
      <UserPageMostWatchedGenres username={username} />
      {watched_movies.length === 0 ? (
        <div className="flex flex-col items-center w-full mt-10 h-[calc(100%-54px)] ">
          <h2 className="text-center font-bold text-2xl">{username}님을 위한 추천 리스트!</h2>
          <div className="flex gap-y-10 justify-center sm:gap-10 md:gap-5 gap-5 items-center h-full">
            <p className="w-full text-2xl text-center">추천을 받기 위해 평점이나 리뷰를 남겨주세요.</p>
          </div>
        </div>
      ) : (
        <RecommendationList username={username} watched_movies={watched_movies} />
      )}
    </>
  );
};

export default RecommendationPage;
