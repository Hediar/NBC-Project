import DiscussionDetail from '@/components/Discussion/detail/DiscussionDetail';
import MovieDetailInfo from '@/components/MovieDetail/MovieDetailInfo';
import Discussion from '@/components/MovieDetail/discussion/Discussion';
import supabase from '@/supabase/config';
import Link from 'next/link';

export default async function MovieDetailLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { movieId: string };
}) {
  const { movieId } = params;
  const { data: discussionPostData } = await supabase
    .from('discussion_post')
    .select('*')
    .eq('movie_id', movieId)
    .order('vote_count', { ascending: false })
    .single();
  console.log('관련토픽데이타==>>', discussionPostData);
  return (
    <section style={{ width: '80%', margin: '0 auto' }}>
      <MovieDetailInfo movieId={movieId} />
      {children}
      <div className="my-10">
        <p className="text-2xl font-bold">이 영화 토픽</p>
      </div>
      {discussionPostData ? (
        <div className="mt-[25px]">
          <DiscussionDetail discussionId={discussionPostData.post_id} />
        </div>
      ) : (
        <div className="w-full text-center flex flex-col gap-3">
          <p>관련 토픽이 없습니다</p>
          <p>
            이 영화의 <span className="font-bold">첫번째 토픽 주인공</span>이 되어보세요
          </p>
          <Link href={`/discussion/regist`}>바로가기</Link>
        </div>
      )}
    </section>
  );
}
