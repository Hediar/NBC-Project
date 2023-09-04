import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '토론작성 - 무비바바'
};

export default async function MovieDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
