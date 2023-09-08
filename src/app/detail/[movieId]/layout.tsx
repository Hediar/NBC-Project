import MovieDetailInfo from '@/components/MovieDetail/MovieDetailInfo';
import supabase from '@/supabase/config';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { getMovieDetail } from '@/api/tmdb';
import DiscussionTopic from '@/components/Discussion/detail/DiscussionTopic';
import DiscussionCommentContainer from '@/components/Discussion/detail/comment/DiscussionCommentContainer';
import RelatedDiscussionList from '@/components/Discussion/detail/related-discussion/RelatedDiscussionList';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  {
    params
  }: {
    params: {
      movieId: string;
    };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { movieId } = params;
  const movieData = await getMovieDetail(movieId);

  return {
    title: `${movieData?.title ?? 'null'} - 영화상세 - 무비바바`
  };
}

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
    .order('created_at', { ascending: false })
    .single();

  return (
    <section>
      <MovieDetailInfo movieId={movieId} />

      {children}

      <section style={{ width: '80%', margin: '0 auto' }}>
        {discussionPostData?.length ? (
          <div className="flex">
            <main className="w-full flex flex-col relative">
              <DiscussionTopic postData={discussionPostData} />
              <DiscussionCommentContainer discussionId={discussionPostData.post_id} />

              <section className="w-full sm:absolute sm:w-1/3 sm:left-2/3">
                <RelatedDiscussionList discussionId={discussionPostData.post_id} />
              </section>
            </main>
          </div>
        ) : (
          <div className="w-full text-center flex flex-col gap-3 mt-[50px]">
            <h3 className="h3_suit flex">이 영화 토픽</h3>
            <p>관련 토픽이 없습니다</p>
            <p>
              이 영화의 <span className="font-bold">첫번째 토픽 주인공</span>이 되어보세요
            </p>
            <Link
              href={`/discussion/regist?movieId=${movieId}`}
              className="border rounded-xl py-1 mb-5 hover:bg-gray-200"
            >
              작성하기
            </Link>
          </div>
        )}
      </section>
    </section>
  );
}
