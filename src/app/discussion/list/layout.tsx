import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '토론 - 무비바바'
};

export const dynamic = 'force-dynamic';

export default async function DiscussionListLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
