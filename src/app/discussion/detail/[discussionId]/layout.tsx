'use server';

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
    title: `${discussionPostData?.title ?? 'default'} - 토론 - 무비바바`
  };
}

export default async function DiscussionDetailLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-screen">{children}</div>;
}
