import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '토론작성 - 무비바바'
};

export default async function DiscussionRegistLayout({ children }: { children: React.ReactNode }) {
  return <div className="wrap shadow1">{children}</div>;
}
