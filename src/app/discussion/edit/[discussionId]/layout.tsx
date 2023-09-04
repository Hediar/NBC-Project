import { Metadata, ResolvingMetadata } from 'next';
import supabase from '@/supabase/config';

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
    title: `${discussionPostData?.title ?? 'default'} - 토론수정 - 무비바바`
  };
}

export default async function MovieDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
