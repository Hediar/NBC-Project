import DiscussionContent from '@/components/Discussion/detail/DiscussionContent';
import supabase from '@/supabase/config';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  {
    params
  }: {
    params: {
      discussionId: string;
    };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { discussionId } = params;
  const { data: discussionPostData } = await supabase
    .from('discussion_post')
    .select('*')
    .eq('post_id', discussionId)
    .single();

  return {
    title: `${discussionPostData.title} - 토론 - 무비바바`
  };
}

export default async function DiscussionDetailLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { discussionId: string };
}) {
  const { discussionId } = params;
  const { data: discussionPostData } = await supabase
    .from('discussion_post')
    .select('*')
    .eq('post_id', discussionId)
    .single();

  return (
    <section style={{ width: '80%', margin: '0 auto' }}>
      <DiscussionContent movieId={discussionPostData?.movie_id} />
      {children}
    </section>
  );
}
