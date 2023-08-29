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

  // layout에서 검증하므로 ! 사용
  const watched_movies: string[] = userData![0].watched_movies;

  return (
    <>
      <UserPageMostWatchedGenres username={username} />
      {watched_movies.length === 0 ? (
        <>{username}님은 아직 아무 영화도 추가하지 않으셨습니다.</>
      ) : (
        <RecommendationList username={username} watched_movies={watched_movies} />
      )}
    </>
  );
};

export default RecommendationPage;
